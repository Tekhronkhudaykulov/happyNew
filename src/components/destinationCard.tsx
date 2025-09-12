"use client";
import Button from "./button";
import { APP_ROUTES } from "@/router/path";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import formatPrice from "@/utils/formatPrice";
import { ASSETS } from "@/assets";

export type DestinationType = "local" | "regional" | "global";

export interface LocalDestination {
  id: number;
  type: "local";
  flag: string;
  country: string;
  price: string;
}

export interface RegionalOrGlobalDestination {
  id: number;
  type: "regional" | "global";
  flag: string;
  name: string;
  label: string;
}

export type Destination = LocalDestination | RegionalOrGlobalDestination;

interface DestinationCardProps {
  type: DestinationType;
  data: Destination[];
}

const DestinationCard: React.FC<DestinationCardProps> = ({ type, data }) => {
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const t = useTranslations("");

  const isLocal = type === "local";

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const limit = isDesktop ? 8 : 6;
  const shouldLimit = data?.length > limit && !showAll;
  const visibleData = shouldLimit ? data?.slice(0, limit) : data;

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-[10px] ${
          isLocal
            ? data?.length <= 2
              ? "grid-cols-2 sm:grid-cols-2"
              : "grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-2 md:grid-cols-2"
        }`}
      >
        {visibleData?.map((item, index) => (
          <div
            onClick={() => router.push(`${APP_ROUTES.COUNTRY}/${item.id}`)}
            key={index}
            className="flex items-center gap-4 bg-[#1C1C1C0D] rounded-[12px] p-[10px] pl-0 md:p-[22px] justify-center md:justify-normal cursor-pointer"
          >
            <div className="img_wrapper shrink-0">
              <Image src={ASSETS.turkey} className="destination-flag" alt="" />
            </div>
            <div>
              <h1 className="destination-country text-black font-medium md:font-bold text-[15px] md:text-[18px]">
                {item?.name}
              </h1>
              <Button bg="orange" title={formatPrice(item?.price_sell)} />
            </div>
          </div>
        ))}
      </div>

      {shouldLimit && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="mx-auto mt-0 md:mt-4 px-6 py-2 border text-black border-[#1C1C1C] rounded-lg text-[13px] md:text-base"
          >
            {t("otzives.showAll") ?? "Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationCard;