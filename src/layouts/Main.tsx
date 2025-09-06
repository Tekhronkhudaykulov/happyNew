"use client";

import Image from "next/image";
import { ASSETS } from "../assets";
import { localDestinations } from "../data/TabData";
import { Search, X, ArrowRight } from "lucide-react";
import "../styles/main.css";
import { useEffect, useState } from "react";
import { APP_ROUTES } from "../router/path";
import type { LocalDestination } from "../components/destinationCard";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import phone from "@/assets/phone.png";
import smPhone from "@/assets/sm-phone.png";

const Main = () => {
  const t = useTranslations("main"); // ✅ namespace "main"

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [defaultCountries, setDefaultCountries] = useState<LocalDestination[]>(
    []
  );

  const filteredDestinations = localDestinations.filter(
    (item) =>
      item.type === "local" &&
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!searchTerm) {
      const localItems = localDestinations.filter(
        (item) => item.type === "local"
      );
      const shuffled = localItems.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      setDefaultCountries(selected);
    } else {
      setDefaultCountries([]);
    }
  }, [searchTerm]);

  const handleSelect = (country: string) => {
    setSelectedCountry(country);
    setSearchTerm("");
  };

  const handleRemove = () => {
    setSelectedCountry(null);
  };

  const handleSearchClick = () => {
    if (selectedCountry) {
      const selectedDestination = localDestinations.find(
        (item) => item.country === selectedCountry
      );
      if (selectedDestination?.id) {
        router.push(
          `${APP_ROUTES.COUNTRY.replace(
            ":id",
            selectedDestination.id.toString()
          )}`
        );
      }
    }
  };

  const [showPlaceholder, setShowPlaceholder] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const handleResize = () => {
      setShowPlaceholder(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main relative bg-[#FFFFFF8F]">
      <Image className="main-map" src={ASSETS.bgmap} alt="" />
      <div className="main-container">
        <div className="container relative md:flex-row flex-col gap-[15px] flex md:gap-[150px]">
          <Image className="main-download" src={ASSETS.download} alt="" />
          <Image className="main-esim" src={ASSETS.esim} alt="" />
          <div className="main-wrapper">
            <h1 className="main-title">{t("title")}</h1>

            <ul className="main-list">
              <p className="main-item">{t("nav1")}</p>
              <p className="main-item">{t("nav2")}</p>
              <p className="main-item hidden sm:block">{t("nav3")}</p>
            </ul>

            <div className="search-container">
              <div className="flex items-center pl-2 gap-2">
                {selectedCountry && (
                  <span
                    key={selectedCountry}
                    className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm"
                  >
                    {selectedCountry}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={handleRemove}
                    />
                  </span>
                )}

                <input
                  type="text"
                  placeholder={
                    showPlaceholder ? t("placeholder") : t("placeholder-sm")
                  }
                  className="md:min-w-[300px] text-[#FFFFFF54] min-w-[50px] border-none outline-none p-2 bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="icon-wrapper">
                <Search
                  className="text-[#FFFFFF] cursor-pointer"
                  size={23}
                  onClick={handleSearchClick}
                />
              </div>
            </div>

            {searchTerm && (
              <div className="absolute z-20 mt-2 w-full max-w-[500px] bg-[#FFFFFF] rounded-lg">
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((item, index) => (
                    <div
                      key={item.country}
                      className={`flex items-center justify-between px-4 py-4 cursor-pointer ${
                        selectedCountry === item.country
                          ? "bg-orange-50 text-orange-600"
                          : "hover:bg-gray-100"
                      } ${
                        index !== filteredDestinations.length - 1
                          ? "border-b"
                          : ""
                      }`}
                      onClick={() => handleSelect(item.country)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedCountry === item.country
                              ? "border-orange-600"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedCountry === item.country && (
                            <div className="w-2 h-2 rounded-full bg-orange-600" />
                          )}
                        </div>
                        <Image
                          src={item.flag}
                          alt={item.country}
                          className="w-5 h-5"
                          width={20}
                          height={20}
                        />
                        <span className="text-sm truncate max-w-[120px]">
                          {item.country}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.price}
                      </span>
                      <ArrowRight className="text-[#1C1C1C]" />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm px-3 py-2">
                    {t("no_results")}
                  </p>
                )}
              </div>
            )}

            {!searchTerm && defaultCountries.length > 0 && (
              <div className="flex gap-4 mt-8">
                {defaultCountries.map((item) => (
                  <div
                    key={item.country}
                    className="cursor-pointer bg-[#4546477A] rounded-[12px] p-[15px]"
                    onClick={() => handleSelect(item.country)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="img_wrapper shrink-0">
                        <Image
                          src={item.flag}
                          className="destination-flag"
                          alt={item.country}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <h1 className="text-[20px] font-normal text-[#FFFFFF]">
                          {item.country}
                        </h1>
                        <div>
                          <Button title={item.price} bg="orange" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Image
            className="main-phone hidden sm:block"
            src={phone}
            alt="phone"
          />
          <Image className="main-phone sm:hidden" src={smPhone} alt="smphone" />
        </div>
      </div>
    </div>
  );
};

export default Main;
