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
import { buildQuery } from "@/utils/buildQuery";
import { API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import formatPrice from "@/utils/formatPrice";

async function fetchPlans(params: Record<string, any>) {
  // ruscha harflarni to‘g‘ri qilish uchun
  const encodedParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      typeof value === "string" ? encodeURIComponent(value) : value,
    ])
  );

  const query = buildQuery(encodedParams);
  const res = await fetch(`${API_URL}/${endpoints.plans}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

const Main = () => {
  const t = useTranslations("main");
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const [defaultCountries, setDefaultCountries] = useState<LocalDestination[]>(
    []
  );

  const { data: plansData, isLoading } = useQuery({
    queryKey: ["plans", searchTerm],
    queryFn: () =>
      fetchPlans({
        ...(searchTerm ? { search: searchTerm } : {}),
      }),
  });

  const filteredDestinations = localDestinations.filter(
    (item) =>
      item.type === "local" &&
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // if (!searchTerm) {
    //   const localItems = localDestinations.filter(
    //     (item) => item.type === "local"
    //   );
    //   const shuffled = localItems.sort(() => 0.5 - Math.random());
    //   const selected = shuffled.slice(0, 2);
    //   setDefaultCountries(selected);
    // } else {
    //   setDefaultCountries([]);
    // }
    setDefaultCountries(plansData?.data?.data?.slice(0, 2));
  }, [plansData]);

  const handleSelect = (country: string) => {
    if (!selectedCountries.includes(country)) {
      setSelectedCountries([...selectedCountries, country]);
    }
    setSearchTerm("");
  };

  const handleRemove = (country: string) => {
    setSelectedCountries(selectedCountries.filter((c) => c !== country));
  };

  const handleSearchClick = () => {
    // if (selectedCountries.length > 0) {
    //   const lastSelected = selectedCountries[selectedCountries.length - 1];
    //   const selectedDestination = localDestinations.find(
    //     (item) => item.country === lastSelected
    //   );

    // }
    // if (selectedDestination?.id) {
    //   router.push(`${APP_ROUTES.COUNTRY}`);
    // }
    if (selectedCountries.length > 0) {
      const ids = selectedCountries.map((c: any) => c.id).join("-");

      // [{id:1}, {id:2}] => "1,2"

      router.push(`${APP_ROUTES.COUNTRY}/${ids}`);
    }
    // router.push(`${APP_ROUTES.COUNTRY}/${1}`);
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

            {/* 🔹 Input va tanlanganlar */}
            <div className="search-container">
              <div className="flex items-center pl-2 gap-2 flex-wrap">
                {selectedCountries.map((country) => (
                  <span
                    key={country}
                    className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm"
                  >
                    {country?.name}
                    <X
                      size={14}
                      className="cursor-pointer"
                      onClick={() => handleRemove(country)}
                    />
                  </span>
                ))}

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

            {/* 🔹 Dropdown */}
            {searchTerm && (
              <div className="absolute z-20 mt-2 w-full text-black max-w-[500px] bg-[#FFFFFF] rounded-lg">
                {plansData?.data?.data?.length > 0 ? (
                  plansData?.data?.data?.map((item: any, index: any) => (
                    <div
                      key={item.country}
                      className={`flex items-center justify-between px-4 py-4 cursor-pointer ${
                        selectedCountries.includes(item.name)
                          ? "bg-orange-50 text-orange-600"
                          : "hover:bg-gray-100"
                      } ${
                        index !== filteredDestinations.length - 1
                          ? "border-b"
                          : ""
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedCountries.includes(item.name)
                              ? "border-orange-600"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedCountries.includes(item.name) && (
                            <div className="w-2 h-2 rounded-full bg-orange-600" />
                          )}
                        </div>
                        <Image
                          src={ASSETS.turkey}
                          alt={item.country}
                          className="w-5 h-5"
                          width={20}
                          height={20}
                        />
                        <span className="text-sm truncate max-w-[120px]">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatPrice(item?.price_sell)}
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

            {/* 🔹 Default countries */}
            {!searchTerm && defaultCountries?.length > 0 && (
              <div className="flex gap-4 mt-8">
                {defaultCountries.map((item: any) => (
                  <div
                    key={item.country}
                    className="cursor-pointer bg-[#4546477A] rounded-[12px] p-[15px]"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="img_wrapper shrink-0">
                        <Image
                          src={ASSETS.turkey}
                          className="destination-flag"
                          alt={item.country}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <h1 className="text-[20px] font-normal text-[#FFFFFF]">
                          {item.name}
                        </h1>
                        <div>
                          <Button
                            title={formatPrice(item?.price_sell)}
                            bg="orange"
                          />
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
