"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft, Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ASSETS } from "@/assets";
import PackageCard from "@/components/packageCard";
import formatPrice from "@/utils/formatPrice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_IMAGE, API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import {
  Loading5756,
  LoadingWaiting,
  PaymentError,
  PaymentSuccess,
} from "@/components/loading/loading";
import { socket } from "@/socket/socketClient";
import { useOrderSocket } from "@/socket/useSocketEvents";
import Image from "next/image";
import { toast } from "react-toastify";
import Button from "@/components/button";
import { setToken } from "@/config/api";

async function fetchPayments() {
  const res = await fetch(`${API_URL}/${endpoints.payment}`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

async function fetchProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${endpoints.profile}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // if (res.status === 401) {
  //   toast.error("Сессия истекла, пожалуйста заполните форму");
  // }

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

const ConfirmPage = () => {
  const t = useTranslations();
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [orderData, setOrderData] = useState(null);
  console.log(orderData, "orderData");

  const [object, setObject] = useState<any>(null);
  console.log(object, "object");

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
    if (file) {
      setFileName(file.name);
      setPassportFile(file); // ✅ Файлни сақланг
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("998")) {
      value = value.substring(3);
    }
    if (value.length > 9) value = value.substring(0, 9);
    if (value.length > 0) {
      const formatted = `+998 ${value.substring(0, 2)} ${value.substring(
        2,
        5
      )} ${value.substring(5, 7)} ${value.substring(7, 9)}`.trim();
      e.target.value = formatted;
      setPhone(formatted);
    } else {
      e.target.value = "";
      setPhone("");
    }
  };

  const { data: paymentData } = useQuery({
    queryKey: ["payment"],
    queryFn: fetchPayments,
  });

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const formData = new FormData();
      formData.append("plan_id", data.plan_id);
      formData.append("fio", data.fio);
      formData.append("phone", data.phone);
      formData.append("payment_type_id", data.payment_type_id);
      if (data.passport) formData.append("passport", data.passport);
      if (data.passport_image)
        formData.append("passport_image", data.passport_image);

      const res = await fetch(`${API_URL}/${endpoints.orderCreate}`, {
        method: "POST",
        // headers: { "Content-Type": "application/json" }, // ❌ Учиринг!
        body: formData, // ✅ FormData юборинг
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to create payment: ${JSON.stringify(errorData)}`
        );
      }
      return res.json();
    },
    onSuccess: (res) => {
      console.log(res, "res");

      const orderId = res?.order_id ?? res?.data?.order_id;
      setOrderData(res);

      if (res?.token) {
        localStorage.setItem("token", res?.token);
      }
      if (orderId) {
        const token = localStorage.getItem("token");
        socket?.emit("join_order", {
          orderId: orderId,
          token,
        });
      }
      setShowOrderModal(true);
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const handlePayment = () => {
    if (!fio || fio.trim() === "") {
      toast.error("Исмни киритинг!");
      return;
    }
    if (!phone || phone.trim() === "") {
      toast.error("Телефон рақамини киритинг!");
      return;
    }
    if (!selectedMethod) {
      toast.error("Тўлов усулини танланг!");
      return;
    }

    mutate({
      plan_id: id,
      fio,
      phone,
      payment_type_id: selectedMethod,
      passport_image: passportFile,
    });
  };

  const { mutate: authMutate, isPending: authPending } = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`${API_URL}/${endpoints.auth}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          `Failed to create payment: ${JSON.stringify(errorData)}`
        );
      }
      return res.json();
    },
    onSuccess: async (res) => {
      console.log(res, "authRes");
      setToken(res?.data?.token);
      await router.push("/simDone");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const handleAuth = () => {
    const token = localStorage.getItem("token");
    const phoneNumber = phoneRef.current?.value || "";
    const formatted = phoneNumber.replace(/\D/g, "");
    authMutate({
      phone: formatted,
      order_id: String(orderData?.order_id),
      secret: token,
    });
  };

  useOrderSocket({
    onOrderData: (data) => {
      if (data) {
        setShowOrderModal(true);
      }
    },
    onOrderUpdated: async (data) => {
      if (data?.status_name === "Активный") {
        localStorage.setItem("simkard", JSON.stringify(data?.simcards[0]));
        await setShowSuccessModal(true);
        await handleAuth();
      }
      if (data?.status_name === "Отменен") {
        setShowSuccessModal(false);
        setShowCancelModal(true);

        setTimeout(() => {
          setShowCancelModal(false);
        }, 3000);
      }
    },
    onError: (data) => {
      toast.error(data?.message);
    },
    onConnect: (id) => console.log("Ulandi:", id),
    onDisconnect: (reason) => console.log("Uzildi:", reason),
  });

  useEffect(() => {
    if (profileData?.data) {
      if (profileData.data.phone) {
        setPhone(profileData.data.phone);
      }
      if (profileData.data.full_name) {
        setFio(profileData.data.full_name);
      }
    }
  }, [profileData?.data]);

  return (
    <>
      {isPending && (
        <div className="loading-overlay">
          <Loading5756 />
        </div>
      )}

      {showOrderModal && (
        <div className="loading-overlay">
          <LoadingWaiting selectedMethod={selectedMethod} />
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

        <div className="py-6 md:pb-4 pb-[15px] container relative ">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-8">
            <a
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.history.back();
                }
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center touch-action-manipulation"
              title={t("auth.back")}
            >
              <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
            </a>
            <h1 className="font-semibold text-black text-xl sm:text-2xl lg:text-[35px]">
              {t("auth.confirm")}
            </h1>
          </div>

          <div className="flex flex-col items-stretch md:flex-row gap-[10px] md:gap-[13px]">
            <div className="block md:hidden">
              <PackageCard
                flag={`${API_IMAGE}/${object?.region_group?.img}`}
                country={object?.name}
                gb={object?.quantity_internet}
                days={object?.expiry_day}
                price={`${formatPrice(object?.price_sell)}`}
                variant="buy"
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <div className="bg-[#1C1C1C0D] w-full rounded-[12px] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row gap-[10px] md:gap-[20px]">
                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#595959]">
                      {t("auth.name")}
                    </p>
                    <input
                      type="text"
                      placeholder="Ivan"
                      className="w-full bg-white p-2 text-black rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                      value={fio || ""}
                      onChange={(e) => setFio(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#595959]">
                      {t("auth.phone")}*
                    </p>
                    <input
                      ref={phoneRef}
                      type="text"
                      placeholder="+998 99 999 99 99"
                      className="w-full bg-white p-2 text-black rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
                      value={phone || "+998 "}
                      onChange={handlePhoneChange}
                    />
                  </div>

                  <div className="w-full">
                    <p className="text-sm mb-2 text-[#595959]">
                      {t("auth.passport")}*
                    </p>

                    <div className="relative">
                      {profileData?.data?.passport_image ? (
                        <>
                          <div className="relative w-full">
                            <img
                              src={`${API_IMAGE}/${profileData?.data?.passport_image}`}
                              alt="passport"
                              className="w-full max-h-40 object-contain border rounded-lg"
                            />

                            {/* Edit ikonka */}

                            {/* Fayl yuklash input */}
                            <input
                              type="file"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={handleFileUpload}
                            />
                          </div>
                          <Download className="absolute bottom-0 right-2 text-white bg-black rounded-full p-1" />
                        </>
                      ) : (
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
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm mb-2 text-[#595959]">{t("auth.pay")}*</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-3">
                    {paymentData?.data?.map((method: any) =>
                      ["click", "payme", "visa", "octo_uzs"].includes(
                        method?.key
                      ) ? (
                        <div
                          key={method?.id}
                          className={`w-full h-[60px] md:h-[85px] flex items-center justify-center bg-white rounded-[12px] cursor-pointer ${
                            selectedMethod === method?.id
                              ? "border border-[#F06F1E]"
                              : "border border-transparent"
                          }`}
                          onClick={() => setSelectedMethod(method?.id)}
                        >
                          <Image
                            alt=""
                            src={
                              method?.name === "Click"
                                ? ASSETS.click
                                : method?.name === "Payme"
                                ? ASSETS.payme
                                : method?.name === "Visa"
                                ? ASSETS.visa
                                : ASSETS.bycard
                            }
                            className={`md:w-24 md:h-auto h-14 w-[120px] object-contain ${
                              method?.name === "Click" ||
                              method?.name === "Payme"
                                ? "h-30 w-30"
                                : ""
                            }`}
                          />
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:pb-0 pb-[75px]">
                <Button
                  classname="mt-[-5px] w-full"
                  title={isPending ? `${t("loading")}...` : t("auth.pay")}
                  disabled={
                    isPending ||
                    !fio ||
                    fio.trim() === "" ||
                    !phone ||
                    phone.trim() === "" ||
                    !selectedMethod ||
                    (!fileName && !profileData?.data?.passport_image)
                  }
                  onclick={handlePayment}
                />
              </div>
            </div>

            <div className="md:block hidden">
              <PackageCard
                item={object}
                flag={`${API_IMAGE}/${object?.region_group?.img}`}
                country={object?.name}
                gb={object?.quantity_internet}
                days={object?.expiry_day}
                price={formatPrice(object?.price_sell)}
                variant="buy"
              />
            </div>
          </div>
        </div>

        {/* <button
            disabled={
              isPending ||
              !fio ||
              fio.trim() === "" ||
              !phone ||
              phone.trim() === "" ||
              !selectedMethod ||
              !passportFile
            }
            onClick={handlePayment}
            className="w-full bg-[#F06F1E] text-white mb-8 rounded-lg py-2"
          >
            {isPending ? "Loading..." : t("auth.pay")}
          </button> */}

        <div className="">
          <FooterNav />
        </div>
      </div>
    </>
  );
};

export default ConfirmPage;
