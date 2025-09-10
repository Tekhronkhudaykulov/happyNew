"use client";

import { useRouter } from "next/navigation";
import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ASSETS } from "@/assets";
import InfoItem from "@/components/infoitem";
import Button from "@/components/button";
import { APP_ROUTES } from "@/router/path";
import Image from "next/image";
import { useTranslations } from "next-intl";

const SimReady = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="py-4 sm:py-6 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center transition hover:bg-[#1C1C1C1A]"
          >
            <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
          </button>
          <h1 className="font-semibold text-lg sm:text-xl lg:text-3xl leading-tight tracking-[-0.03em] text-[#1C1C1C]">
            {t("ready.title")}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Chap blok */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-[#272727] p-6 sm:p-8 rounded-xl">
              <h3 className="text-white font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.instruction")}
              </h3>

              <div className="mt-6 sm:mt-8 space-y-4">
                <InfoItem
                  isThree={true}
                  titleKey="ready.iphone"
                  contentKey="ready.active-first"
                />
                <InfoItem
                  isThree={true}
                  titleKey="ready.android"
                  contentKey="ready.active-second"
                />
                <InfoItem
                  isThree={true}
                  titleKey="ready.hand"
                  contentKey="ready.active-third"
                  hasBorder={false}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 gap-4">
                  <h4 className="text-white text-base sm:text-lg font-normal">
                    {t("ready.isvalid")} 17.11.2025 19:19
                  </h4>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <h4 className="text-white text-sm sm:text-lg font-normal">
                      {t("ready.need")}
                    </h4>
                    <h4 className="text-[#F06F1E] text-sm sm:text-lg font-normal">
                      {t("ready.support")}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#272727] p-6 sm:p-8 rounded-xl">
              <h3 className="text-white font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.silka")}
              </h3>

              <div className="flex flex-col sm:flex-row items-start justify-between mt-4 gap-6">
                <div className="w-full">
                  <h4 className="text-white text-base sm:text-lg font-normal">
                    {t("ready.iphone")}
                  </h4>
                  <div className="mt-4 border border-white rounded-xl py-3 px-4 flex items-center justify-between">
                    <p className="text-white mr-[5px] text-sm sm:text-base font-medium">
                      {t("ready.go")}
                    </p>
                    <ArrowRight size={20} className="text-white" />
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white text-base sm:text-lg font-normal">
                      {t("ready.code")}
                    </h4>
                    <p className="text-[#B9B9B9] text-sm md:block hidden">
                      {t("ready.copy")}
                    </p>
                  </div>
                  <div className="mt-4 border border-[#FFFFFF6B] rounded-xl py-3 px-4 flex items-center justify-center">
                    <p className="text-[#FFFFFF6B] text-sm font-medium text-center truncate">
                      LPA:1$RSP.BILLIONCONNECT.COM$B9543DD3925943FD9808B4994B1F5AC5
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* O‘ng blok */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-[#1C1C1C0D] p-6 sm:p-8 rounded-xl">
              <h3 className="text-[#1C1C1C] font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.order")}#162
              </h3>

              <div className="my-4 flex justify-center">
                <Image
                  src={ASSETS.qr}
                  alt="QR Code"
                  className="max-w-[150px] sm:max-w-[200px] h-auto"
                />
              </div>

              <h3 className="text-[#1C1C1C] font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.info")}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    ICCID:
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate">
                    89812003919118650899
                  </h3>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    UID:
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate">
                    19118650899
                  </h3>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    PIN:
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate">
                    1234
                  </h3>
                </div>

                <div className="flex items-center justify-between py-3">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    PUK:
                  </p>
                  <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate">
                    03558176
                  </h3>
                </div>
              </div>
            </div>

            <Button
              navigate={APP_ROUTES.MY_SIMS}
              bg="orange"
              title={t("my.check")}
              classname="w-full"
            />

            <div className="bg-[#1C1C1C0D] p-6 sm:p-8 rounded-xl">
              <h3 className="text-[#1C1C1C] font-medium text-lg sm:text-xl lg:text-2xl">
                {t("ready.dispethcer")}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    {t("ready.phonenum")}
                  </p>
                  <a
                    href="tel:+998999999999"
                    className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate"
                  >
                    +998 99 999 99 99
                  </a>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#E4E4E4]">
                  <p className="text-[#595959] text-sm sm:text-base font-normal truncate">
                    {t("ready.bot")}
                  </p>
                  <a
                    href="https://t.me/happytel"
                    className="text-sm sm:text-base font-normal text-[#1C1C1C] truncate"
                  >
                    @happytel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <FooterNav />
      </div>
    </div>
  );
};

export default SimReady;
