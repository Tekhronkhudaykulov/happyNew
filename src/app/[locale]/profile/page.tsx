"use client";

import { useRouter } from "next/navigation";
import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft, X } from "lucide-react";
import { ASSETS } from "@/assets";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

const tokenName = "safe_road_token";

const Profile = () => {
  const t = useTranslations();
  const router = useRouter();

  const [modalPhone, setModalPhone] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyStep, setIsVerifyStep] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem(tokenName);
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsModalOpen(true);
    }
  }, []);

  const handleModalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('998')) {
      value = value.substring(3);
    }
    if (value.length > 9) value = value.substring(0, 9);
    if (value.length > 0) {
      const formatted = `+998 ${value.substring(0, 2)} ${value.substring(2, 5)} ${value.substring(5, 7)} ${value.substring(7, 9)}`.trim();
      e.target.value = formatted;
      setModalPhone(formatted);
    } else {
      e.target.value = '';
      setModalPhone('');
    }
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

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) value = value.substring(0, 5);
    if (value.length > 0) {
      const formatted = `${value.substring(0, 1)} ${value.substring(1, 2)} ${value.substring(2, 3)} ${value.substring(3, 4)} ${value.substring(4, 5)}`.trim();
      e.target.value = formatted;
      setCode(formatted);
    } else {
      e.target.value = '';
      setCode('');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsVerifyStep(false);
    setModalPhone("");
    setCode("");
    router.push("/");
  };

  const handleLogin = () => {
    if (!isVerifyStep) {
      if (modalPhone) {
        setIsVerifyStep(true);
      } else {
        return;
      }
    } else {
      if (code) {
        localStorage.setItem(tokenName, "token");
        setIsAuthenticated(true);
        setPhone(modalPhone);
        setIsModalOpen(false);
      } else {
        return;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="py-6 md:pb-6 pb-[125px] container relative">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-[#1C1C1C] md:size-5" />
          </button>
          <h1 className="font-bold text-xl md:text-2xl lg:text-[35px] leading-tight tracking-[-0.06em] text-black">
            {t("ready.personal")}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full rounded-[12px] p-4 md:p-6 bg-[#1C1C1C0D]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-black">
                  {t("ready.name")}
                </label>
                <input
                  type="text"
                  placeholder={t("ready.name")}
                  defaultValue="Иван"
                  className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block text-black">
                  {t("ready.passport")}
                </label>
                <input
                  type="text"
                  placeholder={t("ready.passport")}
                  className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block text-black">
                  {t("ready.phonenum")}
                </label>
                <input
                  ref={phoneRef}
                  type="tel"
                  placeholder={t("ready.phonenum")}
                  value={phone}
                  className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-transparent text-black"
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/4 flex">
            <div className="w-full flex flex-col bg-[#ED713C] rounded-[12px] p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-[14px] font-normal">
                  {t("ready.keshbek")}
                </h2>
                <h2 className="text-[30px] font-medium">LOGO</h2>
              </div>
              <h1 className="text-[30px] md:text-[35px] font-bold mt-4">
                70 000 UZS
              </h1>
              <p className="text-xs md:text-[14px] mt-auto">
                {t("ready.orders")}: 30
              </p>
            </div>
          </div>

          <Image
            src={ASSETS.bgg2}
            alt="Background 1"
            className="hidden md:block absolute top-[103px] rounded-[12px] right-[18px] w-[225px] h-[95px]"
          />
          <Image
            src={ASSETS.bgg}
            alt="Background 2"
            className="hidden md:block absolute top-[218px] rounded-[12px] right-[187px] w-[225px] h-[95px]"
          />
        </div>
      </div>

      {isModalOpen && !isAuthenticated && (
        <div className="fixed inset-0 bg-[#1C1C1C99] flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.15)] translate-y-0 sm:translate-y-[-10%]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl lg:text-[34px] font-medium text-[#1C1C1C]">
                {t("auth.welcome")}
              </h2>
              <button
                onClick={closeModal}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
              >
                <X size={16} className="text-[#1C1C1C57] sm:size-5" />
              </button>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-10">
              <p className="text-base text-black sm:text-lg font-normal mb-2">
                {t("auth.phone")}
              </p>
              <input
                type="tel"
                value={modalPhone}
                onChange={handleModalPhoneChange}
                className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
                placeholder="+998 99 999 99 99"
              />
            </div>

            {isVerifyStep && (
              <div className="mt-2 sm:mt-4 lg:mt-6">
                <p className="text-base text-black sm:text-lg font-normal mb-2">
                  {t("auth.code")}
                </p>
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
                  placeholder="9 9 9 9 9"
                />
              </div>
            )}

            <button
              title={t("login.submit")}
              className="w-full mt-6 bg-[#F06F1E] text-white rounded-lg py-2 sm:py-3 hover:bg-[#8F4D26] cursor-pointer transition-colors text-base sm:text-lg"
              onClick={handleLogin}
            >
              {t("auth.button")}
            </button>
          </div>
        </div>
      )}

      <div className="mt-auto">
        <FooterNav />
      </div>
    </div>
  );
};

export default Profile;