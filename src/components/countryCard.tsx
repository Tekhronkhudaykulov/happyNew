"use client";

import { useTranslations } from "next-intl";
import Button from "./button";
import Image from "next/image";

interface Card {
  flag: string;
  gb: number;
  days: number;
  price: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ESimCard({
  flag,
  gb,
  days,
  price,
  isSelected,
  onSelect,
}: Card) {
  const t = useTranslations(""); // ✅ namespace "main"

  return (
    <div
      className={`rounded-xl p-3 sm:p-4 md:p-[14px] cursor-pointer  ${
        isSelected ? "bg-[#F06F1E1C] border border-[#F06F1E]" : "bg-[#1C1C1C0D]"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="img_wrapper shrink-0">
          <Image
            src={flag}
            alt="flag"
            className="w-6 h-6 sm:w-8 sm:h-8 destination-flag"
          />
        </div>

        <div>
          <Button title={`${price} UZS`} bg="orange" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1 sm:gap-2 font-medium text-base sm:text-lg text-[#1C1C1C]">
          {gb}
          GB
        </p>

        <p className="flex items-center gap-1 sm:gap-2 font-medium text-base sm:text-lg text-[#1C1C1C]">
          {days}
          {t("country.days")}
        </p>
      </div>
    </div>
  );
}
