"use client";

import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft } from "lucide-react";
import PackageCard from "@/components/packageCard";
import { useState, useEffect } from "react";
import { useAuthModal } from "@/providers/AuthModalProvider";
import { ASSETS } from "@/assets";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { API_IMAGE, API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { APP_ROUTES } from "@/router/path";
import Button from "@/components/button";
import { Loading5755 } from "@/components/loading/loading";
import Loading from "../loading";

const tokenName = "token";

async function fetchEsim() {
  const token = localStorage.getItem(tokenName);

  const res = await fetch(`${API_URL}/${endpoints.simOrder}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch eSIM data");
  const data = await res.json();
  console.log("eSIM data:", data);
  return data;
}

const MyEsim = () => {
  const t = useTranslations();
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAll, setShowAll] = useState(false); // State for show all
  const [isDesktop, setIsDesktop] = useState(true);
  const [id, setId] = useState();

  console.log(id); // State for device detection

  useEffect(() => {
    const token = localStorage.getItem(tokenName);
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: esims, isLoading } = useQuery({
    queryKey: ["esims"],
    queryFn: fetchEsim,
    enabled: isAuthenticated,
  });

  console.log(esims, "esims");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="py-6 pb-[100px] container text-center mt-10">
          <p className="text-gray-500">{t("auth.please_login")}</p>
          <button
            onClick={openAuthModal}
            className="mt-4 p-3 bg-[#ED713C] text-white rounded-lg"
          >
            {t("auth.button")}
          </button>
        </div>
        <div className="mt-auto">
          <FooterNav openAuthModal={openAuthModal} />
        </div>
      </div>
    );
  }

  const limit = isDesktop ? 6 : 4;
  const shouldLimit = esims?.length > limit && !showAll;
  const visibleEsims = shouldLimit ? esims.slice(0, limit) : esims;
  console.log(esims);

  return (
    <>
      {isLoading ? (
        <Loading5755 />
      ) : (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="py-6 md:pb-[120px] pb-[85px] container">
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <a
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.history.back();
                  }
                }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1C1C0D] flex items-center justify-center touch-action-manipulation"
                title={t("auth.back")}
              >
                <ArrowLeft size={16} className="text-[#1C1C1C] sm:size-5" />
              </a>
              <h1 className="font-semibold text-black text-xl sm:text-2xl lg:text-[35px] leading-tight tracking-[-0.06em]">
                {t("my.title")}
              </h1>
            </div>
            <>
              <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
                {visibleEsims?.length > 0 ? (
                  visibleEsims?.map((esim: any, index: number) => (
                      <PackageCard
                        id={esim?.id}
                        key={esim.id || index}
                        flag={`${API_IMAGE}/${esim.region_group?.flag}`}
                        country={esim.region_group?.name}
                        gb={esim.plan?.quantity_internet}
                        days={esim.days_remaining}
                        price={esim.total_payments_amount}
                        createdAt={esim.created_at}
                        iccid={esim.simcards?.[0]?.ssid}
                        balance={esim.total_payments_amount}
                        variant="active"
                        handleRoute={() => {
                          localStorage.setItem(
                            "simkard",
                            JSON.stringify(esim?.simcards[0])
                          );

                          router.push("/simDone");
                        }}
                      />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center w-full gap-2">
                    <p className="text-black text-left">{t("my.no")}</p>
                    <div className="w-fit">
                      <Button
                        bg="orange"
                        title={t("my.buy")}
                        navigate={APP_ROUTES.HOME}
                      />
                    </div>
                  </div>
                )}
              </div>

              {shouldLimit && (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowAll(true)}
                    className="mx-auto mt-4 px-6 py-2 border text-black border-[#1C1C1C] rounded-lg text-[13px] md:text-base"
                  >
                    {t("otzives.showAll") || "Show All"}
                  </button>
                </div>
              )}
            </>
          </div>

          <div className="mt-auto">
            <FooterNav openAuthModal={openAuthModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default MyEsim;
