"use client";

import { getFAQSdata } from "../data/FAQdata";
import FAQ from "../components/faq";

import { useTranslations } from "next-intl";

const FAQs = () => {
  const t = useTranslations("");

  const FAQSdata = getFAQSdata(t);

  return (
    <div className="my-[50px]">
      <div className="container">
        <div className="lg:flex block items-start lg:justify-between">
          <div className="flex flex-col gap-[30px] md:justify-normal justify-center items-center md:items-start">
            <h1 className="text-[#1C1C1C] lg:text-[40px]/[35px] md:text-[32px]/[32px] text-[28px]/[28px] font-medium">
              {t("faq.title")}
            </h1>

            <p className="text-[#595959] text-[15px]/[17px] md:text-[17px]/[18px] lg:text-[18px]/[16.96px] font-normal md:font-medium max-w-[270px] md:max-w-[320px] lg:max-w-[375px]">
              {t("faq.subtitle")}
            </p>
          </div>

          <div className="flex flex-col gap-[8px] lg:mt-0 mt-[25px] md:mt-[15px] md:justify-normal justify-center items-center md:items-start">
            {FAQSdata?.data?.map((item, idx) => (
              <FAQ key={idx} title={item.question} question={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
