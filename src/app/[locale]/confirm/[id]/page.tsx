"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ASSETS } from "@/assets";
import PackageCard from "@/components/packageCard";
import formatPrice from "@/utils/formatPrice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import {
  Loading5755,
  LoadingWaiting,
  PaymentError,
  PaymentSuccess,
} from "@/components/loading/loading";
import { socket } from "@/socket/socketClient";
import { useOrderSocket } from "@/socket/useSocketEvents";

async function fetchPayments() {
  const res = await fetch(`${API_URL}/${endpoints.payment}`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

const ConfirmPage = () => {
  const t = useTranslations();
  const router = useRouter();

  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [object, setObject] = useState<any>(null);

  const [phone, setPhone] = useState<string>();
  const [fio, setFio] = useState<string>();

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("obyekt");
    setObject(saved ? JSON.parse(saved) : null);
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('998')) {
      value = value.substring(3);
    }
    if (value.length > 9) value = value.substring(0, 9);
    if (value.length > 0) {
      const formatted = `+998 ${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5, 7)} ${value.substring(7, 9)}`.trim();
      e.target.value = formatted;
      setPhone(formatted);
    } else {
      e.target.value = '';
      setPhone('');
    }
  };

  const { data: paymentData } = useQuery({
    queryKey: ["payment"],
    queryFn: fetchPayments,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${API_URL}/${endpoints.orderCreate}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create payment");
      return res.json();
    },
    onSuccess: (res) => {
      const orderId = res?.order_id ?? res?.data?.order_id;
      if (orderId) {
        socket?.emit("join_order", String(orderId));
      }
    },
    onError: (err) => {
      console.error("❌ Payment error:", err);
    },
  });

  // 📌 Paymentni boshlash
  const handlePayment = () => {
    if (!fio || !phone) {
      alert("FIO va telefon raqamini kiriting!");
      return;
    }
    mutate({
      plan_id: object?.id,
      fio,
      phone,
      payment_type_id: selectedMethod,
      passport: fileName,
    });
  };

  useOrderSocket({
    onOrderData: (data) => {
      if (data) {
        setShowOrderModal(true);
      }
    },
    onOrderUpdated: (data) => {
      if (data?.status_name === "Активный") {
        setShowSuccessModal(true);

        setTimeout(() => {
          router.push("/simDone");
        }, 5000);
      }
      if (data?.status_name === "Отменен") {
        setShowSuccessModal(false);
        setShowCancelModal(true);

        setTimeout(() => {
          setShowCancelModal(false);
        }, 3000);
      }
    },
    onConnect: (id) => console.log("Ulandi:", id),
    onDisconnect: (reason) => console.log("Uzildi:", reason),
  });

  return (
    <>
      {isPending && (
        <div className="loading-overlay">
          <Loading5755 />
        </div>
      )}

      {showOrderModal && (
        <div className="loading-overlay">
          <LoadingWaiting />
        </div>
      )}

      {showSuccessModal && (
        <div className="loading-overlay">
          <PaymentSuccess />
        </div>
      )}

      {showCancelModal && (
        <div className="loading-overlay">
          <PaymentError />
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="py-6 md:pb-6 pb-[25px] container relative ">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
            >
              <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
            </button>
            <h1 className="font-semibold text-black text-xl sm:text-2xl lg:text-[35px]">
              {t("auth.confirm")}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-[13px]">
            {/* Form */}
            <div className="bg-[#1C1C1C0D] w-full rounded-[12px] p-6 flex flex-col gap-8">
              {/* Inputs */}
              <div className="flex flex-col sm:flex-row gap-[20px]">
                <div className="w-full">
                  <p className="text-sm mb-2 text-[#595959]">
                    {t("auth.name")}
                  </p>
                  <input
                    type="text"
                    placeholder="Ivan"
                    className="w-full bg-white p-2 text-black rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                    onChange={(e) => setFio(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <p className="text-sm mb-2 text-[#595959]">
                    {t("auth.phone")}
                  </p>
                  <input
                    ref={phoneRef}
                    type="text"
                    placeholder="+998 99 999 99 99"
                    className="w-full bg-white p-2 text-black rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                    value={phone || ""}
                    onChange={handlePhoneChange}
                  />
                </div>

                <div className="w-full">
                  <p className="text-sm mb-2 text-[#595959]">
                    {t("auth.passport")}
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-white p-2 text-[#F06F1E] rounded-lg"
                      value={fileName || "Загрузить"}
                      readOnly
                    />
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
              </div>

              {/* Payment methods */}
              <div>
                <p className="text-sm mb-2 text-[#595959]">{t("auth.pay")}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  {paymentData?.data?.map((method: any) =>
                    ["click", "payme", "visa", "octo_uzs"].includes(
                      method?.key
                    ) ? (
                      <div
                        key={method?.id}
                        className={`w-full h-[97px] flex items-center justify-center bg-white rounded-[12px] cursor-pointer ${
                          selectedMethod === method?.id
                            ? "border border-[#F06F1E]"
                            : ""
                        }`}
                        onClick={() => setSelectedMethod(method?.id)}
                      >
                        <p>{method?.name}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>

            {/* PackageCard */}
            <PackageCard
              flag={ASSETS.turkey}
              country={object?.name}
              gb={object?.quantity_internet}
              days={object?.expiry_day}
              price={formatPrice(object?.price_sell)}
              variant="buy"
            />
          </div>
        </div>

        {/* Bottom button */}
        <div className="mt-auto">
          <div className="container md:pb-0 pb-[100px]">
            <button
              disabled={isPending}
              onClick={handlePayment}
              className="w-full bg-[#F06F1E] text-white mb-8 rounded-lg py-2"
            >
              {isPending ? "Loading..." : t("auth.pay")}
            </button>
          </div>
          <FooterNav />
        </div>
      </div>
    </>
  );
};

export default ConfirmPage;
