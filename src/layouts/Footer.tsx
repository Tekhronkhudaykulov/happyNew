"use client";

import { useTranslations } from "next-intl";
import { ASSETS } from "../assets";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("");

  return (
    <footer className="mt-[50px] bg-[#272727] text-[#FFFFFF]">
      <div className="container py-[33px] border-[#00000030] border-t-1  md:flex hidden flex-col gap-[70px]">
        <div className="flex items-end justify-between">
          <h1 className="max-w-[285px] font-normal text-[22px]/[26px]">
            {t("footer.subtitle")}
          </h1>

          <div>
            <div className="flex items-center gap-[25px] justify-end">
              <Image src={ASSETS.facebook} alt="" />
              <Image src={ASSETS.linkendin} alt="" />
              <Image src={ASSETS.instagram} alt="" />
            </div>
            <p className="text-[#FFFFFF] text-[16px] font-normal mt-4">
              {t("footer.rights")}
            </p>
            <p className="text-[#FFFFFF] text-[16px] font-normal text-end">
              {t("footer.made-by")}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h1 className="max-w-[500px] font-medium text-[55px]/[60px]">
              {t("footer.title")}
            </h1>

            <Image
              className="mt-[65px] w-[120px]"
              src={ASSETS.logowhite}
              alt=""
            />
          </div>

          <div className="flex items-center gap-[100px]">
            <div className="flex flex-col gap-[25px]">
              <a href="#" className="text-[#FFFFFF] font-normal text-[16px]">
                {t("footer.nav1")}
              </a>
              <a href="#" className="text-[#FFFFFF] font-normal text-[16px]">
                {t("footer.nav2")}
              </a>
              <a href="#" className="text-[#FFFFFF] font-normal text-[16px]">
                {t("footer.nav3")}
              </a>
            </div>

            <div className="flex flex-col gap-[25px]">
              <a href="#" className="text-[#FFFFFF] font-normal text-[16px]">
                {t("footer.nav4")}
              </a>
              <a href="#" className="text-[#FFFFFF] font-normal text-[16px]">
                {t("footer.nav5")}
              </a>
              <a href="#" className="text-[#FFFFFF] font-normal text-[16px]">
                {t("footer.nav6")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Planshet bilan telefonga otdelniy chunki ichidegi blockla boshqacha */}

      <div className="container justify-center py-[33px] border-[#00000030] border-t-1  md:hidden flex flex-col gap-[40px]">
        <h1 className="max-w-[270px] font-normal text-[22px]/[26px]">
          {t("footer.subtitle")}
        </h1>

        <div className="flex items-center justify-between gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <a href="#" className="text-[#FFFFFF] font-normal text-[14px]">
              {t("footer.nav1")}
            </a>
            <a href="#" className="text-[#FFFFFF] font-normal text-[14px]">
              {t("footer.nav2")}
            </a>
            <a
              href="#"
              className="text-[#FFFFFF] font-normal text-[14px]  w-full"
            >
              {t("footer.nav3")}
            </a>
          </div>

          <div className="flex flex-col gap-[20px]">
            <a
              href="#"
              className="text-[#FFFFFF] font-normal text-[14px] w-full"
            >
              {t("footer.nav4")}
            </a>
            <a href="#" className="text-[#FFFFFF] font-normal text-[14px]">
              {t("footer.nav5")}
            </a>
            <a href="#" className="text-[#FFFFFF] font-normal text-[14px]">
              {t("footer.nav6")}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <Image src={ASSETS.logowhite} alt="" className="w-[120px]" />

          <div className="flex items-center gap-[25px]">
            <Image src={ASSETS.facebook} alt="" />
            <Image src={ASSETS.linkendin} alt="" />
            <Image src={ASSETS.instagram} alt="" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-[10px]">
          <p className="text-[#FFFFFF] text-[14px] font-norma">
            {t("footer.rights")}
          </p>
          <div className="flex items-center text-[#FFFFFF] text-[14px] font-normal gap-[5px]">
            {t("footer.made")}{" "}
            <a href="" className="cursor-pointer">
              {t("footer.itdodas")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
