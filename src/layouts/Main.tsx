"use client";

import Image from "next/image";
import { ASSETS } from "../assets";
import { localDestinations } from "../data/TabData";
import { Search, X, ArrowRight } from "lucide-react";
import "../styles/main.css";
import { useEffect, useState, useRef } from "react";
import { APP_ROUTES } from "../router/path";
import type { LocalDestination } from "../components/destinationCard";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import phone from "@/assets/phone.png";
import { buildQuery } from "@/utils/buildQuery";
import { API_IMAGE, API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function Autoplay(slider: any) {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }
  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, 2000);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });
  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
}

async function fetchRegions(params: Record<string, any>) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/${endpoints.regions}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch regions");
  return res.json();
}

const Main = () => {
  const t = useTranslations("main");
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<any>("");
  const [selectedCountries, setSelectedCountries] = useState<any[]>([]);
  console.log(selectedCountries, "selected");

  const [defaultCountries, setDefaultCountries] = useState<LocalDestination[]>(
    []
  );
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { data: regionsData, isLoading } = useQuery({
    queryKey: ["regions", searchTerm],
    queryFn: () =>
      fetchRegions({
        ...(searchTerm ? { name: searchTerm } : {}),
      }),
  });

  const filteredDestinations = localDestinations.filter(
    (item) =>
      item.type === "local" &&
      item.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setDefaultCountries(regionsData?.data || []);
  }, [regionsData]);

  const handleSelect = (country: any) => {
    if (!country.id) {
      console.error("Country ID is missing:", country);
      return;
    }
    console.log(country, "countr");

    if (!selectedCountries.some((c) => c.id === country.id)) {
      setSelectedCountries([...selectedCountries, country]);
    }
    setSearchTerm("");
    setIsInputFocused(false);
    localStorage.setItem("selectedObject", JSON.stringify(country));
    // router.push(`${APP_ROUTES.COUNTRY}/${country.id}`);
  };

  const handleRemove = (country: any) => {
    setSelectedCountries(selectedCountries.filter((c) => c.id !== country.id));
  };

  const handleSearchClick = () => {
    if (selectedCountries.length > 0) {
      const ids = selectedCountries.map((c: any) => c.id).join("-");
      router.push(`${APP_ROUTES.COUNTRY}/${ids}`);
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

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 2, spacing: 16 },
    },
    [Autoplay]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsInputFocused(true);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* {isLoading && <Loading5755 />} */}
      <div className="main relative bg-[#FFFFFF8F]">
        <Image className="main-map" src={ASSETS.bgmap} alt="" />
        <div className="main-container">
          <div className="container relative md:flex-row flex-col gap-[15px] flex md:gap-[100px]">
            <Image
              className="main-download mt-[50px]"
              src={ASSETS.download}
              alt=""
            />
            <Image className="main-gray" src={ASSETS.grey} alt="" />
            <Image className="main-esim" src={ASSETS.esim} alt="" />
            <h3 className="main-headingg text-white">{t("heaidngg")}</h3>
            <div className="main-wrapper">
              <h1 className="main-title">{t("title")}</h1>

              <ul className="main-list">
                <p className="main-item">{t("nav1")}</p>
                <p className="main-item">{t("nav2")}</p>
                <p className="main-item hidden sm:block">{t("nav3")}</p>
              </ul>

              {/* 🔹 Keen Slider и Search Container переставлены для планшетов и выше */}
              <div className="md:flex md:flex-col-reverse">
                {!searchTerm && defaultCountries?.length > 0 && (
                  <div
                    ref={sliderRef}
                    className="keen-slider mt-8 !w-[500px] grid grid-cols-2 overflow-hidden"
                  >
                    {defaultCountries?.map((item: any) => (
                      <div
                        key={item.country}
                        className="keen-slider__slide cursor-pointer h-max bg-[#4546477A]  rounded-[12px] p-[15px]"
                        onClick={() => {
                          localStorage.setItem(
                            "selectedObject",
                            JSON.stringify(item)
                          );
                          router.push(`${APP_ROUTES.COUNTRY}/${item.id}`);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="img_wrapper shrink-0">
                            <Image
                              src={`${API_IMAGE}/${item.img}`}
                              className="destination-flag rounded-full"
                              alt={item.country}
                              width={40}
                              height={40}
                              unoptimized
                            />
                          </div>
                          <div>
                            <p className="text-[20px] font-normal text-[#FFFFFF]">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 🔹 Input va tanlanganlar */}
                <div className="search-container">
                  <div className="flex items-center pl-2 gap-2 w-full">
                    {selectedCountries.map((country) => (
                      <span
                        key={country.id}
                        className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-md text-sm"
                      >
                        {country.name}
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
                      className="text-[#FFFFFF54] w-full border-none outline-none p-2 bg-transparent"
                      value={searchTerm}
                      onChange={handleChange}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
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
                {(searchTerm || isInputFocused) && (
                  <div ref={dropdownRef} className="">
                    <div
                      className="absolute z-30 mt-4  md:mt-[110px] max-w-[90%] w-full text-black 
                    md:max-w-[500px] bg-[#FFFFFF] rounded-lg mb-4
                    md:max-h-[calc(100vh-500px)] max-h-[110px] overflow-y-auto"
                    >
                      {regionsData?.data?.length > 0 ? (
                        regionsData?.data
                          .filter((item: any) =>
                            item.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((item: any, index: number) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between px-4 py-4 cursor-pointer hover:bg-gray-100"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                handleSelect(item);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Image
                                  src={`${API_IMAGE}/${item.img}`}
                                  alt={item.name}
                                  width={20}
                                  height={20}
                                  className="w-5 h-5"
                                />
                                <span className="text-sm truncate max-w-[120px]">
                                  {item.name}
                                </span>
                              </div>
                              <ArrowRight className="text-[#1C1C1C]" />
                            </div>
                          ))
                      ) : (
                        <p className="text-gray-500 text-sm px-3 py-2">
                          {t("no_results")}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Image
              className="main-phone hidden sm:block"
              src={phone}
              alt="phone"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
