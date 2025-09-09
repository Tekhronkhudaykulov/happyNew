"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ASSETS } from "@/assets";
import PackageCard from "@/components/packageCard";
import formatPrice from "@/utils/formatPrice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useOrderChannel } from "@/utils/useOrderChannel"; // ✅ faqat hook ishlatamiz
import { Loading5755 } from "@/components/loading/loading";

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

  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "succeeded" | "failed" | "cancelled" | null
  >(null);

  const isProcessing =
    !!createdOrderId && (orderStatus !== 3 || paymentStatus !== "succeeded");

  const [progress, setProgress] = useState<number>(0);
  const [phone, setPhone] = useState<string>();
  const [fio, setFio] = useState<string>();

  // 📌 LocalStorage obyektni olish
  useEffect(() => {
    const saved = localStorage.getItem("obyekt");
    setObject(saved ? JSON.parse(saved) : null);
  }, []);

  // 📌 File upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  // 📌 Payment usullarini olish
  const { data: paymentData } = useQuery({
    queryKey: ["payment"],
    queryFn: fetchPayments,
  });

  // 📌 Order yaratish mutation
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
      console.log("✅ Payment success:", res);
      const orderId = res?.order_id ?? res?.data?.order_id;

      if (orderId) {
        setCreatedOrderId(Number(orderId));
        setPaymentStatus("pending");
        setProgress(10);
      }
    },
    onError: (err) => {
      console.error("❌ Payment error:", err);
    },
  });

  // 📌 WebSocket ulanish
  useOrderChannel(
    createdOrderId,
    (statusData) => {
      setOrderStatus(statusData.status);
      if (statusData.status === 1) setProgress(30);
      if (statusData.status === 2) setProgress(60);
      if (statusData.status === 3) setProgress(80);
    },
    (paymentData) => {
      setPaymentStatus(paymentData.payment_status);
      if (paymentData.payment_status === "succeeded") setProgress(100);
      if (paymentData.payment_status === "failed") setProgress(0);
    }
  );

  // 📌 Agar order tugasa → boshqa sahifaga o‘tish
  useEffect(() => {
    if (orderStatus === 3 && paymentStatus === "succeeded") {
      router.push("/simDone");
    }
  }, [orderStatus, paymentStatus, router]);

  // 📌 Progressni smooth oshirish
  useEffect(() => {
    if (!isProcessing) return;
    const interval = setInterval(() => {
      setProgress((p) => (p < 95 ? p + 1 : p));
    }, 150);
    return () => clearInterval(interval);
  }, [isProcessing]);

  // 📌 Body scroll bloklash
  useEffect(() => {
    if (isProcessing) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isProcessing]);

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

  return (
    <>
      {isProcessing && (
        <div className="loading-overlay">
          <Loading5755 value={progress} />
        </div>
      )}

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="py-6 container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
            >
              <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
            </button>
            <h1 className="font-semibold text-black text-xl sm:text-2xl lg:text-[35px] leading-tight tracking-[-0.06em]">
              {t("auth.confirm")}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-[13px]">
            {/* Form */}
            <div className="bg-[#1C1C1C0D] w-full rounded-[12px] pt-[27px] pr-[13px] sm:pr-[28px] pb-[45px] pl-[13px] sm:pl-[23px] flex flex-col items-stretch gap-8">
              {/* Inputs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[13px] sm:gap-[25px]">
                <div className="w-full">
                  <p className="text-[14px] sm:text-[16px] mb-2 text-[#595959]">
                    {t("auth.name")}
                  </p>
                  <input
                    type="text"
                    placeholder="Ivan"
                    className="w-full bg-white pl-4 pr-8 py-2 text-black rounded-lg focus:outline-none text-base sm:text-lg"
                    onChange={(e) => setFio(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <p className="text-[14px] sm:text-[16px] mb-2 text-[#595959]">
                    {t("auth.phone")}
                  </p>
                  <input
                    type="text"
                    placeholder="+998 99 999 99 99"
                    className="w-full bg-white pl-4 pr-8 py-2 text-black rounded-lg focus:outline-none text-base sm:text-lg"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <p className="text-[14px] sm:text-[16px] mb-2 text-[#595959]">
                    {t("auth.passport")}
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("auth.placeholder_passport")}
                      className="w-full bg-white pl-4 pr-8 py-2 text-[#F06F1E] rounded-lg focus:outline-none text-base sm:text-lg"
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
                <p className="text-[14px] sm:text-[16px] mb-2 text-[#595959]">
                  {t("auth.pay")}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[20px]">
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
          <div className="container">
            <button
              disabled={isPending}
              onClick={handlePayment}
              className="w-full bg-[#F06F1E] text-white mb-8 rounded-lg py-2 hover:bg-[#8F4D26] transition-colors text-base sm:text-lg disabled:bg-gray-400"
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
