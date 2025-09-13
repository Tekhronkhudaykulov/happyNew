"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft } from "lucide-react";

import PackageCard from "@/components/packageCard";
import { useState } from "react";

import { ASSETS } from "@/assets";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const MyEsim = () => {
  const t = useTranslations();
  const [variant, setVariant] = useState<"active" | "balance">("active");
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="py-6 md:pb-6 pb-[100px] container">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center"
          >
            <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
          </button>
          <h1 className="font-semibold text-black text-xl sm:text-2xl lg:text-[35px] leading-tight tracking-[-0.06em]">
            {t("my.title")}
          </h1>
        </div>

        <div>
          <PackageCard
            flag={ASSETS.turkey}
            country="Turkey"
            gb={1}
            days={7}
            price={100000}
            createdAt="2025-08-13 18:08:19"
            iccid="892200660704000030"
            balance={37000}
            variant={variant}
            onCheckBalance={() => setVariant("balance")}
          />
        </div>
      </div>

      <div className="mt-auto">
        <FooterNav />
      </div>
    </div>
  );
};

export default MyEsim;
