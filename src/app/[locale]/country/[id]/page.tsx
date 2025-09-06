"use client";

import { useParams, useRouter } from "next/navigation";
import { localDestinations, tabConfig } from "@/data/TabData";
import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft, Info, ArrowRight, X } from "lucide-react";
import { getCOUNTRIESdata } from "@/data/CountriesData";
import ESimCard from "@/components/countryCard";
import ServiceCard from "@/components/serviceCard";
import type { RegionalOrGlobalDestination } from "@/components/destinationCard";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import InfoItem from "@/components/infoitem";
import Image from "next/image";
import "@/app/[locale]/globals.css";
import { useTranslations } from "next-intl";

import PhoneInput from "@/components/phoneInput";

const Country = () => {
  const t = useTranslations("");
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const countryId = id ? parseInt(id, 10) : null;
  const country = localDestinations.find((item) => item.id === countryId);
  const data = getCOUNTRIESdata();

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState("+998");
  const [code, setCode] = useState("");
  const [isVerifyStep, setIsVerifyStep] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ localStorage ni client da tekshiramiz
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!localStorage.getItem("authToken"));
    }
  }, []);

  if (!countryId || !country) {
    return (
      <div className="min-h-screen items-center justify-center flex">
        <p className="text-gray-500 text-lg">{t("main.no_results")}</p>
        <div className="fixed bottom-0 w-full">
          <FooterNav />
        </div>
      </div>
    );
  }

  const getRandomRegionalCountries = () => {
    const regionalData = tabConfig.global.data as RegionalOrGlobalDestination[];
    const shuffled = [...regionalData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const randomRegionalCountries = getRandomRegionalCountries();

  const handlePackageSelect = (index: number) => {
    setSelectedPackage(index);
  };

  const handleBuyClick = () => {
    if (isAuthenticated) {
      if (selectedPackage !== null) {
        const selectedItem = data[selectedPackage];
        // ✅ Next.js da state yo‘q, query string orqali yuboramiz
        const query = new URLSearchParams({
          price: selectedItem.price,
          gb: selectedItem.gb.toString(),
          days: selectedItem.days.toString(),
          flag: country.flag,
          country: country.country,
        }).toString();

        router.push(`/confirm?${query}`);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLogin = () => {
    if (!isVerifyStep) {
      setIsVerifyStep(true);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", "1");
      }
      setIsAuthenticated(true);
      setIsModalOpen(false);
      setIsVerifyStep(false);
      setPhone("+998");
      setCode("");
      if (selectedPackage !== null) {
        const selectedItem = data[selectedPackage];
        const query = new URLSearchParams({
          price: selectedItem.price,
          gb: selectedItem.gb.toString(),
          days: selectedItem.days.toString(),
          flag: country.flag,
          country: country.country,
        }).toString();
        router.push(`/confirm?${query}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="py-6 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 lg:mb-10">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 md:mb-0">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
            >
              <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] text-[#1C1C1C] font-semibold">
              {country.country}
            </h1>
          </div>

          <div className="flex items-center border border-[#F06F1E] gap-2 sm:gap-3 bg-[#F4F4F4] rounded-xl py-3 sm:py-4 px-4 sm:px-5">
            <Info size={16} className="text-[#F06F1E] sm:size-5" />
            <p className="font-normal text-[#1C1C1C] text-sm sm:text-base">
              {t("country.not-avaiable")}
            </p>
          </div>
        </div>

        {/* SIM CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-4">
          {data.map((item, idx) => (
            <ESimCard
              key={idx}
              flag={country.flag}
              gb={item.gb}
              days={item.days}
              price={item.price}
              isSelected={selectedPackage === idx}
              onSelect={() => handlePackageSelect(idx)}
            />
          ))}
        </div>

        {/* SERVICES */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-4">
          <ServiceCard
            title={t("country.internet")}
            available={t("country.yes")}
          />
          <ServiceCard
            title={t("country.calls")}
            available={t("country.not")}
          />
          <ServiceCard title={t("country.sms")} available={t("country.not")} />
        </div>

        {/* INFO + OTHERS */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 sm:gap-4 pt-4">
          <div className="bg-[#272727] rounded-xl py-4 sm:py-5 px-4 sm:px-6 w-full mb-4 md:mb-0">
            <h1 className="text-[#FFFFFF] font-medium text-base sm:text-lg md:text-xl">
              {t("country.how-works")}
            </h1>

            <InfoItem titleKey="country.comp" contentKey="country.comp" />
            <InfoItem titleKey="country.onlyint" contentKey="country.onlyint" />
            <InfoItem titleKey="country.active" contentKey="country.active" />
            <InfoItem titleKey="country.date" contentKey="country.date" />
            <InfoItem
              titleKey="country.choice"
              contentKey="country.choice"
              hasBorder={false}
            />
          </div>

          <div className="bg-[#F06F1E1F] pt-4 sm:pt-6 pr-4 sm:pr-6 pb-6 sm:pb-8 pl-4 sm:pl-5 flex flex-col gap-4 sm:gap-6 rounded-xl">
            <h1 className="max-w-full sm:max-w-[300px] font-medium text-[#1C1C1C] text-base sm:text-xl">
              {t("country.others")}
            </h1>

            <div className="flex flex-col gap-3 sm:gap-6">
              {randomRegionalCountries.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center pb-2 border-b border-[#E4E4E4]"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Image
                      alt="flag"
                      src={item.flag}
                      width={32}
                      height={32}
                      className="w-6 h-6 sm:w-8 sm:h-8 destination-flag"
                    />
                    <div>
                      <h4 className="text-sm sm:text-base text-black">
                        Европа
                      </h4>
                      <p className="text-xs sm:text-sm text-black">Евразия</p>
                    </div>
                  </div>
                  <ArrowRight className="text-[#1C1C1C] w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BUY BUTTON */}
        <div onClick={handleBuyClick}>
          <Button
            classname="mt-10 sm:mt-12 md:mt-16 lg:mt-[150px] w-full"
            title={isAuthenticated ? t("auth.buy") : t("country.auth")}
          />
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#1C1C1CAB] flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl lg:text-[34px] font-medium text-[#1C1C1C]">
                {t("auth.welcome")}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
              >
                <X size={16} className="text-[#1C1C1C57] sm:size-5" />
              </button>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-10">
              <p className="text-base sm:text-lg font-normal mb-2 text-black">
                {t("auth.phone")}
              </p>
              <PhoneInput
                mask="+9\9\8 99 999 99 99"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
              />
            </div>

            {isVerifyStep && (
              <div className="mt-2 sm:mt-4 lg:mt-6">
                <p className="text-base sm:text-lg font-normal mb-2 text-black">
                  {t("auth.code")}
                </p>
                <PhoneInput
                  mask="9 9 9 9 9"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-[#CFCFCF1F] px-4 py-2 text-[#1C1C1C] rounded-lg focus:outline-none text-base sm:text-lg"
                />
              </div>
            )}

            <button
              onClick={handleLogin}
              className="w-full mt-6 bg-[#F06F1E] text-white rounded-lg py-2 sm:py-3 hover:bg-[#8F4D26] cursor-pointer transition-colors text-base sm:text-lg"
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

export default Country;
