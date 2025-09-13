"use client";

import { useRouter } from "next/navigation";
import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft } from "lucide-react";
import { ASSETS } from "@/assets";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { useAuthModal } from "@/providers/AuthModalProvider";

const tokenName = "safe_road_token";

const Profile = () => {
  const t = useTranslations();
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const [phone, setPhone] = useState<string>("");
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem(tokenName);
    console.log("useEffect: token found:", token);
    if (token) {
      setPhone(token);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="py-6 md:pb-6 pb-[80px] container relative">
        {localStorage.getItem(tokenName) ? (
          <>
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
                      readOnly
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
          </>
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-500">Please log in to view your profile.</p>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <FooterNav openAuthModal={openAuthModal} />
      </div>
    </div>
  );
};

export default Profile;