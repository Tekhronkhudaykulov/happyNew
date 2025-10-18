"use client";

import { useTranslations } from "next-intl";
import { ASSETS } from "../assets";
import Image from "next/image";
import "../styles/main.css";
import { Phone, MapPin } from "lucide-react";
import { APP_ROUTES } from "@/router/path";

const Footer = () => {
  const t = useTranslations("");

  return (
    <footer className="mt-[30px] pb-[88px]  md:mt-[50px] bg-[#272727] text-[#FFFFFF]">
      <div className="container py-[33px] border-[#00000030] border-t-1  md:flex hidden flex-col ">
        <div className="flex flex-col gap-[50px]">
          <div className="flex  justify-between">
            <div>
              <Image
                className="w-[150px] h-[50px]"
                src={ASSETS.logowhite}
                alt=""
              />
            </div>
            <div>
              <div className="flex items-center justify-end gap-[25px]">
                <a
                  target="_blank"
                  className="cursor-pointer"
                  href="https://www.instagram.com/happytel.uz?igsh=MThhNzVmMXI2Z29tbA=="
                >
                  <Image src={ASSETS.instagram} alt="" className="w-10" />
                </a>
                <a
                  target="_blank"
                  href="https://m.facebook.com/@happytel.uz/?wtsid=rdr_04kOHJKn17HG3Ml5A&hr=1"
                  className="cursor-pointer"
                >
                  <Image src={ASSETS.facebook} alt="" className="w-10" />
                </a>
                <a
                  target="_blank"
                  href="https://t.me/Happytel_uz"
                  className="cursor-pointer"
                >
                  <Image src={ASSETS.telegram} alt="" className="w-10" />
                </a>
              </div>
              <p className="text-[#FFFFFF] text-[16px] font-normal mt-4">
                {t("footer.rights")}
              </p>
              <div className="flex items-center text-[#FFFFFF] text-[14px] font-normal gap-[5px] justify-end">
                {t("footer.made")}{" "}
                <a
                  target="_blank"
                  href="https://itdodasi.uz"
                  className="cursor-pointer underline"
                >
                  {t("footer.itdodas")}
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="flex flex-col gap-[10px]">
                <a
                  href="tel:+99895 680 20 20"
                  className="flex items-center gap-2"
                >
                  <Phone width={20} color={"#ffffff80"} />
                  <p className="text-[#FFFFFF] font-normal text-[16px]">
                    +99895 680 20 20
                  </p>
                </a>

                <a href="#" className="flex items-center gap-2">
                  <MapPin width={20} color={"#ffffff80"} />
                  <p className="text-[#FFFFFF] font-normal text-[16px] max-w-[300px]">
                    {t("footer.loc")}
                  </p>
                </a>
              </div>
              <div className="flex items-center gap-[15px] mt-[30px]">
                <Image className="w-22" src={ASSETS.payment1} alt="" />
                <Image className="w-22" src={ASSETS.payment2} alt="" />
                <Image className="w-22" src={ASSETS.payment3} alt="" />
                <Image className="w-22" src={ASSETS.payment4} alt="" />
              </div>
            </div>

            <div className="flex flex-col gap-[25px] mb-[22px]">
              <a
                href={APP_ROUTES.OFFER}
                className="text-[#FFFFFF] font-normal text-[16px] text-end"
              >
                {t("footer.nav3")}
              </a>
              <a
                href={APP_ROUTES.CONFIDENTIAL}
                rel="noopener noreferrer"
                className="text-[#FFFFFF] font-normal text-[16px] text-end"
              >
                {t("footer.nav5")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Planshet bilan telefonga otdelniy chunki ichidegi blockla boshqacha */}

      <div className="container justify-center pt-[33px] border-[#00000030] border-t-1  md:hidden flex flex-col gap-[30px]">
        <div className="flex justify-between gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <a href="tel:+99895 680 20 20" className="flex items-center gap-2">
              <Phone width={16} color={"#ffffff80"} />
              <p className="text-[#FFFFFF] font-normal text-[12px]">
                +99895 680 20 20
              </p>
            </a>

            <a href="#" className="flex items-center gap-2">
              <MapPin width={20} color={"#ffffff80"} />
              <p className="text-[#FFFFFF] font-normal text-[12px] max-w-[250px]">
                {t("footer.loc")}
              </p>
            </a>
          </div>

          <div className="flex flex-col gap-[20px]">
            <a
              href={APP_ROUTES.OFFER}
              className="text-[#FFFFFF] font-normal text-[13px]  w-full"
            >
              {t("footer.nav3")}
            </a>
            <a
              href={APP_ROUTES.CONFIDENTIAL}
              rel="noopener noreferrer"
              className="text-[#FFFFFF] font-normal text-[13px]"
            >
              {t("footer.nav5")}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <Image src={ASSETS.logowhite} alt="" className="w-[100px]" />

          <div className="flex items-center gap-[20px]">
            <div className="flex items-center gap-[25px]">
              <a
                className="cursor-pointer"
                target="_blank"
                href="https://www.instagram.com/happytel.uz?igsh=MThhNzVmMXI2Z29tbA=="
              >
                <Image src={ASSETS.instagram} alt="" className="w-8" />
              </a>
              <a
                target="_blank"
                href="https://m.facebook.com/@happytel.uz/?wtsid=rdr_04kOHJKn17HG3Ml5A&hr=1"
                className="cursor-pointer"
              >
                <Image src={ASSETS.facebook} alt="" className="w-8" />
              </a>
              <a href="https://t.me/Happytel_uz" className="cursor-pointer" target="_blank">
                <Image src={ASSETS.telegram} alt="" className="w-8" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <p className="text-[#FFFFFF] text-[14px] font-normal">
            {t("footer.rights")}
          </p>
          <div className="flex items-center text-[#FFFFFF] text-[14px] font-normal gap-[5px]">
            {t("footer.made")}{" "}
            <a
              target="_blank"
              href="https://itdodasi.uz"
              className="cursor-pointer underline"
            >
              {t("footer.itdodas")}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-[10px] mt-[10px] justify-center">
          <Image className="w-16" src={ASSETS.payment1} alt="" />
          <Image className="w-16" src={ASSETS.payment2} alt="" />
          <Image className="w-16" src={ASSETS.payment3} alt="" />
          <Image className="w-16" src={ASSETS.payment4} alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
