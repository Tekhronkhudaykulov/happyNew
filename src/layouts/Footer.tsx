"use client";

import { useTranslations } from "next-intl";
import { ASSETS } from "../assets";
import Image from "next/image";
import "../styles/main.css";

const Footer = () => {
  const t = useTranslations("");

  return (
    <footer className="mt-[30px] md:pb-0 pb-[55px]  md:mt-[50px] bg-[#272727] text-[#FFFFFF]">
      <div className="container py-[33px] border-[#00000030] border-t-1  md:flex hidden flex-col gap-[70px]">
        <div className="flex items-end justify-between">
          <h1 className="max-w-[285px] font-normal md:text-[22px]/[26px]">
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

      <div className="container justify-center py-[33px] border-[#00000030] border-t-1  md:hidden flex flex-col gap-[30px]">
        <h1 className="max-w-[270px] font-normal text-[17px]/[22px]">
          {t("footer.subtitle")}
        </h1>

        <div className="flex items-center justify-between gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <a href="#" className="text-[#595959] font-normal text-[13px]">
              {t("footer.nav1")}
            </a>
            <a href="#" className="text-[#595959] font-normal text-[13px]">
              {t("footer.nav2")}
            </a>
            <a
              href="#"
              className="text-[#595959] font-normal text-[13px]  w-full"
            >
              {t("footer.nav3")}
            </a>
          </div>

          <div className="flex flex-col gap-[20px]">
            <a
              href="#"
              className="text-[#595959] font-normal text-[13px] w-full"
            >
              {t("footer.nav4")}
            </a>
            <a href="#" className="text-[#595959] font-normal text-[13px]">
              {t("footer.nav5")}
            </a>
            <a href="#" className="text-[#595959] font-normal text-[13px]">
              {t("footer.nav6")}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <Image src={ASSETS.logowhite} alt="" className="w-[120px]" />

          <div className="flex items-center gap-[20px]">
            <div className="flex items-center gap-[25px]">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.9997 0C6.71567 0 0 6.74047 0 15.0551C0 22.1153 4.8431 28.0398 11.3764 29.667V19.6559H8.28343V15.0551H11.3764V13.0726C11.3764 7.94849 13.6869 5.5734 18.6992 5.5734C19.6496 5.5734 21.2894 5.76068 21.9602 5.94737V10.1176C21.6062 10.0803 20.9912 10.0616 20.2274 10.0616C17.768 10.0616 16.8177 10.9968 16.8177 13.4279V15.0551H21.7172L20.8754 19.6559H16.8177V30C24.2449 29.0997 30 22.7525 30 15.0551C29.9994 6.74047 23.2837 0 14.9997 0Z" />
              </svg>
              <svg
                width="31"
                height="30"
                viewBox="0 0 31 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0674 2.7017C19.0776 2.7017 19.5524 2.71928 21.1295 2.78961C22.5952 2.85407 23.3867 3.10022 23.9144 3.30533C24.612 3.57492 25.1162 3.90311 25.638 4.42469C26.1657 4.95214 26.4881 5.45028 26.7578 6.14769C26.963 6.67513 27.2093 7.47216 27.2738 8.93143C27.3441 10.5138 27.3617 10.9885 27.3617 14.9912C27.3617 18.9998 27.3441 19.4745 27.2738 21.051C27.2093 22.5161 26.963 23.3073 26.7578 23.8347C26.4881 24.5321 26.1598 25.0361 25.638 25.5577C25.1104 26.0852 24.612 26.4075 23.9144 26.6771C23.3867 26.8822 22.5894 27.1283 21.1295 27.1928C19.5466 27.2631 19.0717 27.2807 15.0674 27.2807C11.0572 27.2807 10.5823 27.2631 9.00524 27.1928C7.53954 27.1283 6.74806 26.8822 6.22041 26.6771C5.52273 26.4075 5.01853 26.0793 4.49674 25.5577C3.96909 25.0303 3.64663 24.5321 3.37694 23.8347C3.17175 23.3073 2.92551 22.5103 2.86102 21.051C2.79066 19.4686 2.77307 18.9939 2.77307 14.9912C2.77307 10.9826 2.79066 10.5079 2.86102 8.93143C2.92551 7.4663 3.17175 6.67513 3.37694 6.14769C3.64663 5.45028 3.97495 4.94628 4.49674 4.42469C5.02439 3.89725 5.52273 3.57492 6.22041 3.30533C6.74806 3.10022 7.5454 2.85407 9.00524 2.78961C10.5823 2.71928 11.0572 2.7017 15.0674 2.7017ZM15.0674 0C10.9927 0 10.4827 0.0175816 8.88212 0.0879078C7.28744 0.158234 6.19109 0.416097 5.24132 0.78531C4.2505 1.1721 3.41212 1.68197 2.5796 2.52002C1.74122 3.35222 1.23116 4.19027 0.84421 5.17484C0.474853 6.1301 0.21689 7.22016 0.146536 8.81422C0.0761822 10.42 0.0585938 10.9299 0.0585938 15.0029C0.0585938 19.076 0.0761822 19.5859 0.146536 21.1858C0.21689 22.7798 0.474853 23.8758 0.84421 24.8252C1.23116 25.8156 1.74122 26.6536 2.5796 27.4858C3.41212 28.318 4.2505 28.8338 5.23546 29.2147C6.19109 29.5839 7.28158 29.8418 8.87626 29.9121C10.4768 29.9824 10.9869 30 15.0615 30C19.1362 30 19.6462 29.9824 21.2468 29.9121C22.8415 29.8418 23.9378 29.5839 24.8876 29.2147C25.8725 28.8338 26.7109 28.318 27.5434 27.4858C28.376 26.6536 28.8919 25.8156 29.273 24.831C29.6423 23.8758 29.9003 22.7857 29.9707 21.1916C30.041 19.5917 30.0586 19.0819 30.0586 15.0088C30.0586 10.9357 30.041 10.4259 29.9707 8.82594C29.9003 7.23188 29.6423 6.13596 29.273 5.18656C28.9036 4.19027 28.3936 3.35222 27.5552 2.52002C26.7227 1.68783 25.8843 1.1721 24.8993 0.79117C23.9437 0.421957 22.8532 0.164095 21.2585 0.0937683C19.6521 0.0175816 19.142 0 15.0674 0Z"
                  fill="white"
                />
                <path
                  d="M15.9409 7.05884C11.5567 7.05884 7.99976 10.4182 7.99976 14.5588C7.99976 18.6995 11.5567 22.0588 15.9409 22.0588C20.3252 22.0588 23.8821 18.6995 23.8821 14.5588C23.8821 10.4182 20.3252 7.05884 15.9409 7.05884ZM15.9409 19.4239C13.0966 19.4239 10.7897 17.2451 10.7897 14.5588C10.7897 11.8725 13.0966 9.69382 15.9409 9.69382C18.7853 9.69382 21.0921 11.8725 21.0921 14.5588C21.0921 17.2451 18.7853 19.4239 15.9409 19.4239Z"
                  fill="white"
                />
                <path
                  d="M24.7645 5.73539C24.7645 6.46829 24.1695 7.05892 23.441 7.05892C22.7081 7.05892 22.1174 6.46398 22.1174 5.73539C22.1174 5.0025 22.7124 4.41187 23.441 4.41187C24.1695 4.41187 24.7645 5.00681 24.7645 5.73539Z"
                  fill="white"
                />
              </svg>

              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M27.7793 0H2.21484C0.990234 0 0 0.966797 0 2.16211V27.832C0 29.0273 0.990234 30 2.21484 30H27.7793C29.0039 30 30 29.0273 30 27.8379V2.16211C30 0.966797 29.0039 0 27.7793 0ZM8.90039 25.5645H4.44727V11.2441H8.90039V25.5645ZM6.67383 9.29297C5.24414 9.29297 4.08984 8.13867 4.08984 6.71484C4.08984 5.29102 5.24414 4.13672 6.67383 4.13672C8.09766 4.13672 9.25195 5.29102 9.25195 6.71484C9.25195 8.13281 8.09766 9.29297 6.67383 9.29297ZM25.5645 25.5645H21.1172V18.6035C21.1172 16.9453 21.0879 14.8066 18.8027 14.8066C16.4883 14.8066 16.1367 16.6172 16.1367 18.4863V25.5645H11.6953V11.2441H15.9609V13.2012H16.0195C16.6113 12.0762 18.0645 10.8867 20.2266 10.8867C24.7324 10.8867 25.5645 13.8516 25.5645 17.707V25.5645Z" />
              </svg>
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
      </div>
    </footer>
  );
};

export default Footer;
