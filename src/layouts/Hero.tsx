"use client";

import Image from "next/image";
import { ASSETS } from "../assets";
import "../styles/main.css";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("");

  return (
    <div className="my-[40px] md:my-[100px]">
      <div className="container">
        <div className="md:flex items-center justify-between">
          <h1 className="text-[#1C1C1C] text-start md:text-[40px] text-[22px] font-medium max-w-[490px]">
            {t("hero.title")}
          </h1>
          <p className="max-w-[375px] text-start md:text-[16px] text-[14px] mt-4 md:mt-0 text-[#595959A3]">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="md:grid grid-cols-2 hidden gap-[12px] mt-[20px]">
          <div className="bg-[#282728] rounded-[12px] p-[20px] flex items-center">
            <div className="">
              <h2 className="text-[#FFFFFF] text-[24px] font-medium">
                {t("hero.card1_title")}
              </h2>
              <p className="text-[#595959] text-[16px]  font-medium max-w-[480px]">
                {t("hero.card1_text")}
              </p>
            </div>
            <Image
              className="top-[120px] left-[175px] w-[250px] position-img"
              src={ASSETS.card1}
              alt=""
            />
          </div>

          <div className="bg-[#282728] rounded-[12px] p-[20px] flex items-center">
            <div className="">
              <h2 className="text-[#FFFFFF] text-[24px] font-medium">
                {t("hero.card2_title")}
              </h2>
              <p className="text-[#595959] text-[16px]  font-medium max-w-[480px]">
                {t("hero.card2_text")}
              </p>
            </div>

            <Image
              className="top-[170px] left-[450px] w-[250px] position-img"
              src={ASSETS.card2}
              alt=""
            />
          </div>

          <div className="bg-[#282728] rounded-[12px] p-[20px] flex items-center">
            <div className="">
              <h2 className="text-[#FFFFFF] text-[24px] font-medium">
                {t("hero.card3_title")}
              </h2>
              <p className="text-[#595959] text-[16px]  font-medium max-w-[480px]">
                {t("hero.card3_text")}
              </p>
            </div>

            <Image
              className="top-[125px] right-[50px] position-img w-[150px]"
              src={ASSETS.card3}
              alt=""
            />
          </div>

          <div className="bg-[#282728] rounded-[12px] p-[20px] flex items-center">
            <div className="">
              <h2 className="text-[#FFFFFF] text-[24px] font-medium">
                {t("hero.card4_title")}
              </h2>
              <p className="text-[#595959] text-[16px]  font-medium max-w-[400px]">
                {t("hero.card4_text")}
              </p>
            </div>

            <Image
              className="top-[450px] w-[150px] left-[205px] position-img"
              src={ASSETS.card4}
              alt=""
            />
        </div>
        </div>

        {/* PHONE */}

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-[30px] lg:hidden">
          <div className="group bg-[#282728] hover:bg-[#F06F1E] rounded-[12px] py-[25px] px-[15px] w-full flex flex-col justify-between">
            <h2 className="text-[#FFFFFF] text-start text-[16px]/[15px] font-medium">
              {t("hero.card1_title")}
            </h2>
            <p className="text-[#595959] group-hover:text-[#FFFFFF] text-start line-clamp-7 text-[15px]/[13px] font-medium mt-4">
              {t("hero.card1_text")}
            </p>
          </div>

          <div className="group bg-[#282728] hover:bg-[#F06F1E] rounded-[12px] py-[25px] px-[15px] w-full flex flex-col justify-between">
            <h2 className="text-[#FFFFFF] text-[16px]/[15px] font-medium text-start">
              {t("hero.card2_title")}
            </h2>
            <p className="text-[#595959] group-hover:text-[#FFFFFF] text-start line-clamp-7 text-[15px]/[13px] font-medium mt-4">
              {t("hero.card2_text")}
            </p>
          </div>

          <div className="group bg-[#282728] hover:bg-[#F06F1E] rounded-[12px] py-[25px] px-[15px] w-full flex flex-col justify-between">
            <h2 className="text-[#FFFFFF] text-start text-[16px]/[15px] font-medium">
              {t("hero.card3_title")}
            </h2>
            <p className="text-[#595959] group-hover:text-[#FFFFFF] text-start line-clamp-7 text-[15px]/[13px] font-medium mt-4">
              {t("hero.card3_text")}
            </p>
          </div>

          <div className="group bg-[#282728] hover:bg-[#F06F1E] rounded-[12px] py-[25px] px-[15px] w-full flex flex-col justify-between">
            <h2 className="text-[#FFFFFF] text-start text-[16px]/[15px] font-medium">
              {t("hero.card4_title")}
            </h2>
            <p className="text-[#595959] group-hover:text-[#FFFFFF] text-start line-clamp-7 text-[15px]/[13px] font-medium mt-4">
              {t("hero.card4_text")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
