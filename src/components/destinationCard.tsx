"use client";
import Button from "./button";
import { ArrowRight } from "lucide-react";
import { APP_ROUTES } from "@/router/path";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
  console.log(data, "data");

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
  const shouldLimit = data.length > limit && !showAll;
  const visibleData = shouldLimit ? data.slice(0, limit) : data;

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div
        className={`grid gap-[12px] ${
          isLocal
            ? data.length <= 2
              ? "grid-cols-1 sm:grid-cols-2 justify-center"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-2"
        }`}
      >
        {visibleData.map((item, index) => {
          if (isLocal && "country" in item && "price" in item) {
            return (
              <div
                onClick={() =>
                  router.push(
                    `${APP_ROUTES.COUNTRY.replace(":id", item.id.toString())}`
                  )
                }
                key={index}
                className="flex items-center gap-12 md:gap-4 bg-[#1C1C1C0D] rounded-[12px] p-4 md:p-[22px] md:pr-[45px] cursor-pointer"
              >
                <div className="img_wrapper shrink-0">
                  <Image src={item.flag} className="destination-flag" alt="" />
                </div>
                <div>
                  <h1 className="destination-country text-black font-bold text-[16px] md:text-[18px]">
                    {item.country}
                  </h1>
                  <Button bg="orange" title={item.price} />
                </div>
              </div>
            );
          } else if ("name" in item && "label" in item) {
            return (
              <div
                onClick={() =>
                  router.push(
                    `${APP_ROUTES.COUNTRY.replace(":id", item.id.toString())}`
                  )
                }
                key={index}
                className="flex cursor-pointer items-center sm:justify-between bg-[#1C1C1C0D] rounded-[12px] p-4 md:p-[22px] gap-4"
              >
                <div className="flex items-center gap-12 md:gap-4">
                  <div className="img_wrapper shrink-0">
                    <Image
                      src={item.flag}
                      className="destination-flag"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h1 className="destination-country text-[16px] md:text-[18px]">
                      {item.name}
                    </h1>
                    <div className="inline-block">
                      <Button bg="orange" title={item.label} />
                    </div>
                  </div>
                </div>
                <ArrowRight className="text-[#1C1C1C] md:block hidden" />
              </div>
            );
          }

          return null;
        })}
      </div>

      {shouldLimit && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="mx-auto mt-5 px-6 py-2 border text-black border-[#1C1C1C] rounded-lg text-sm md:text-base"
          >
            {t("otzives.showAll") ?? "Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DestinationCard;
