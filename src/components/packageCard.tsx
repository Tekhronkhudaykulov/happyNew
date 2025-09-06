"use client";

import type { FC } from "react";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type PackageCardProps = {
  flag?: string | null;
  country?: string;
  gb?: number;
  days: number;
  price?: number;
  createdAt?: string;
  iccid?: string;
  balance?: number;
  variant: "buy" | "active" | "balance";
  onCheckBalance?: () => void;
};

const PackageCard: FC<PackageCardProps> = ({
  flag,
  country,
  gb,
  days,
  price,
  createdAt,
  iccid,
  balance,
  variant,
  onCheckBalance,
}) => {
  const t = useTranslations("");

  const router = useRouter();

  return (
    <div className="bg-[#1C1C1C0D] flex flex-col w-full sm:w-11/12 md:w-3/5 lg:w-2/5 max-w-[400px] min-w-[280px] rounded-[12px] pt-4 px-3 sm:px-5 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src={flag}
            alt={`${country} flag`}
            className="w-6 h-6 sm:w-8 sm:h-8 object-cover destination-flag"
          />
          <h1 className="text-base sm:text-lg text-black font-medium truncate">
            {t("auth.paket")} {country}
          </h1>
        </div>

        {variant !== "buy" && (
          <div className="bg-[#FFFFFF] w-[46px] h-[42px] rounded-lg flex items-center justify-center">
            <Share2 size={20} className="text-[#5959599C]" />
          </div>
        )}
      </div>

      <div className="my-6 sm:my-8">
        {variant === "buy" && (
          <>
            <Row
              label={t("my.tarif")}
              value={`${gb}GB - ${days}${t("country.days")}`}
            />
            <Row label={t("auth.set")} value={t("auth.ism")} />
            <Row label={t("auth.razdacha")} value={t("auth.available")} />
          </>
        )}

        {variant === "active" && (
          <>
            <Row label={t("my.tarif")} value={`${gb}GB`} />
            <Row label={t("my.date")} value={`${days} ${t("country.days")}`} />
            <Row label={t("my.created")} value={createdAt} />
            <Row label="ICCID" value={iccid} />
          </>
        )}

        {variant === "balance" && (
          <>
            <Row label={t("auth.tarif")} value={`${gb}GB`} />
            <Row label={t("my.date")} value={`${days} ${t("country.days")}`} />
            <Row label={t("my.created")} value={createdAt} />
            <Row label="ICCID" value={iccid} />
          </>
        )}
      </div>

      {variant === "buy" && (
        <div className="flex items-center justify-between mt-auto">
          <h2 className="text-base sm:text-lg font-medium text-[#1C1C1C] truncate">
            {t("auth.price")}
          </h2>
          <h3 className="text-base sm:text-lg font-medium text-[#1C1C1C]">
            {price} UZS
          </h3>
        </div>
      )}

      {variant === "active" && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
          <button
            className="flex-1 bg-[#F06F1E20] text-[#F06F1E] py-2 rounded-lg text-sm sm:text-base"
            onClick={onCheckBalance}
          >
            {t("my.check")}
          </button>
          <div
            onClick={() => router.push("/simDone")}
            className="flex-1 bg-[#E4E4E4] text-[#1C1C1C] flex items-center justify-center py-2 rounded-lg text-sm sm:text-base"
          >
            {t("my.detail")}
          </div>
        </div>
      )}

      {variant === "balance" && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
          <button className="flex-1 bg-[#F06F1E] text-white py-2 rounded-lg text-sm sm:text-base truncate">
            {t("my.ostatok")} {balance} MB
          </button>
          <div
            onClick={() => router.push("/simDone")}
            className="flex-1 bg-[#E4E4E4] text-[#1C1C1C] flex items-center justify-center py-2 rounded-lg text-sm sm:text-base"
          >
            {t("my.detail")}
          </div>
        </div>
      )}
    </div>
  );
};

const Row = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4] last:border-b-0">
    <p className="text-[#595959] text-sm sm:text-base font-normal truncate max-w-[50%]">
      {label}
    </p>
    <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate max-w-[50%]">
      {value}
    </h3>
  </div>
);

export default PackageCard;
