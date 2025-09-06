"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ Next.js hooklari
import { ASSETS } from "@/assets";
import PackageCard from "@/components/packageCard";
import Image from "next/image";

const ConfirmPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ query params olish uchun

  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // 🔹 Query orqali keladigan ma'lumotlar
  const price = searchParams.get("price");
  const gb = searchParams.get("gb");
  const days = searchParams.get("days");
  const flag = searchParams.get("flag");

  const country = searchParams.get("country");

  // Agar query bo‘lmasa — error page
  if (!price || !gb || !days || !flag || !country) {
    return (
      <div className="min-h-screen items-center justify-center flex">
        <p className="text-gray-500 text-lg">Нет даты</p>
        <div className="fixed bottom-0 w-full">
          <FooterNav />
        </div>
      </div>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handlePayment = () => {
    if (!selectedMethod) return;

    router.push("/mySim");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="py-6 container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => router.back()} // ✅ back uchun
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
          </button>
          <h1 className="font-semibold text-black text-xl sm:text-2xl lg:text-[35px] leading-tight tracking-[-0.06em]">
            {t("auth.confirm")}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-[13px]">
          <PackageCard
            flag={ASSETS.turkey}
            country={country}
            gb={gb}
            days={days}
            price={price}
            variant="buy"
          />

          <div className="bg-[#1C1C1C0D] w-full rounded-[12px] pt-[27px] pr-[13px] sm:pr-[28px] pb-[45px] pl-[13px] sm:pl-[23px] flex flex-col items-stretch gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[13px] sm:gap-[25px]">
              <div className="w-full">
                <p className="text-[14px] sm:text-[16px] font-normal mb-2 text-[#595959]">
                  {t("auth.name")}
                </p>
                <input
                  type="text"
                  placeholder="Ivan"
                  className="w-full bg-[#FFFFFF] pl-4 pr-8 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
                />
              </div>

              <div className="w-full">
                <p className="text-[14px] sm:text-[16px] font-normal mb-2 text-[#595959]">
                  {t("auth.phone")}
                </p>
                <input
                  type="text"
                  placeholder="+998 99 999 99 99"
                  className="w-full bg-[#FFFFFF] pl-4 pr-8 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
                />
              </div>

              <div className="w-full">
                <p className="text-[14px] sm:text-[16px] font-normal mb-2 text-[#595959]">
                  {t("auth.passport")}
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("auth.placeholder_passport")}
                    className="w-full bg-[#FFFFFF] pl-4 pr-8 py-2 text-[#F06F1E] rounded-lg focus:outline-none text-base sm:text-lg"
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

            <div>
              <p className="text-[14px] sm:text-[16px] font-normal mb-2 text-[#595959]">
                {t("auth.pay")}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-[20px]">
                {["click", "payme", "visa", "card"].map((method) => (
                  <div
                    key={method}
                    className={`w-full h-[97px] flex items-center justify-center bg-[#FFFFFF] rounded-[12px] cursor-pointer ${
                      selectedMethod === method ? "border border-[#F06F1E]" : ""
                    }`}
                    onClick={() => setSelectedMethod(method)}
                  >
                    <Image
                      src={ASSETS[method as keyof typeof ASSETS]}
                      alt={method}
                      className="max-w-full max-h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="container">
          <button
            title={t("login.submit")}
            className="w-full bg-[#F06F1E] text-white mb-8 rounded-lg py-2 hover:bg-[#8F4D26] cursor-pointer transition-colors text-base sm:text-lg"
            onClick={handlePayment}
          >
            {t("auth.pay")}
          </button>
        </div>

        <FooterNav />
      </div>
    </div>
  );
};

export default ConfirmPage;
