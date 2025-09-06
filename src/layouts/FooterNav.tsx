"use client";

import { APP_ROUTES } from "../router/path";
import { House, CardSim, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const FooterNav = () => {
  const t = useTranslations(""); // i18n namespace
  const pathname = usePathname();

  const normalizedPath = pathname.replace(/^\/(ru|en)(?=\/|$)/, "");

  // ✅ Active holatlarni tekshirish
  const isActiveHome = normalizedPath === APP_ROUTES.HOME;

  const isActiveMySims =
    normalizedPath === APP_ROUTES.MY_SIMS ||
    normalizedPath.startsWith(APP_ROUTES.MY_SIMS);

  const isActiveProfile =
    normalizedPath === APP_ROUTES.PROFILE ||
    normalizedPath.startsWith("/profile") ||
    normalizedPath === APP_ROUTES.LOGIN ||
    normalizedPath === APP_ROUTES.VERIFY;

  console.log(isActiveProfile, "isActiveProfile");

  return (
    <div className="w-full flex justify-center pt-[20px] pb-[25px] bg-[#FFFFFF] shadow-[0_1px_20px_0_rgba(0,0,0,0.18)]">
      <div className="flex gap-[70px]">
        {/* Home */}
        <Link
          href={APP_ROUTES.HOME}
          className={`flex flex-col justify-center items-center gap-[3px] ${
            isActiveHome ? "text-[#F06F1E]" : ""
          }`}
        >
          <House
            size={31}
            className={isActiveHome ? "text-[#F06F1E]" : "text-[#C6C6C6]"}
          />
          <p
            className={`text-center text-[14px]/[16px] font-medium ${
              isActiveHome ? "text-[#F06F1E]" : "text-[#00000094]"
            }`}
          >
            {t("footernav.main")}
          </p>
        </Link>

        {/* My Sims */}
        <Link
          href={APP_ROUTES.MY_SIMS}
          className={`flex flex-col justify-center items-center gap-[3px] ${
            isActiveMySims ? "text-[#F06F1E]" : ""
          }`}
        >
          <CardSim
            size={31}
            className={isActiveMySims ? "text-[#F06F1E]" : "text-[#C6C6C6]"}
          />
          <p
            className={`text-center text-[14px]/[16px] font-medium ${
              isActiveMySims ? "text-[#F06F1E]" : "text-[#00000094]"
            }`}
          >
            {t("footernav.myesims")}
          </p>
        </Link>

        {/* Profile */}
        <Link
          href={APP_ROUTES.PROFILE}
          className={`flex flex-col justify-center items-center gap-[3px] ${
            isActiveProfile ? "text-[#F06F1E]" : ""
          }`}
        >
          <User
            size={31}
            className={isActiveProfile ? "text-[#F06F1E]" : "text-[#C6C6C6]"}
          />
          <p
            className={`text-center text-[14px]/[16px] font-medium ${
              isActiveProfile ? "text-[#F06F1E]" : "text-[#00000094]"
            }`}
          >
            {t("footernav.profile")}
          </p>
        </Link>
      </div>
    </div>
  );
};
