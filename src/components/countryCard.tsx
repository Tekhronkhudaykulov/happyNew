"use client";

import { useTranslations } from "next-intl";
import Button from "./button";
import Image from "next/image";

interface Card {
  flag: any;
  gb: number;
  days: number;
  price: string;
  isSelected: boolean;
  onSelect: () => void;
  tarrifName: string;
}

export default function ESimCard({
  flag,
  gb,
  days,
  price,
  isSelected,
  onSelect,
  tarrifName,
}: Card) {
  const t = useTranslations(""); // ✅ namespace "main"
  console.log(flag, "flag");
  return (
    <div
      className={`rounded-xl p-3 sm:p-4 md:p-[14px] cursor-pointer z-50  ${
        isSelected ? "bg-[#F06F1E1C] border border-[#F06F1E]" : "bg-[#1C1C1C0D]"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center  justify-between mb-4 sm:mb-5">
        <div className="flex items-center w-full justify-between">
          <p className="text-black">{tarrifName}</p>
          <Image
            src={flag}
            alt="flag"
            width={24}
            height={24}
            className="w-6 h-6 sm:w-8 sm:h-8 destination-flag rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1 sm:gap-2 font-medium text-base sm:text-lg text-[#1C1C1C]">
          {gb}
          GB /
          <p className="flex items-center gap-1 sm:gap-2 font-medium text-base sm:text-lg text-[#1C1C1C]">
            {days}
            {t("country.days")}
          </p>
        </p>
        <div>
          <p className="text-[#F06F1E] font-bold">{price}</p>
        </div>
      </div>
    </div>
  );
}
