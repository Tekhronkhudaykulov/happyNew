"use client";

import React, { useState } from "react";
import DestinationCard from "../components/destinationCard";
import type { DestinationType } from "../components/destinationCard";
import { tabConfig } from "../data/TabData";
import { useTranslations } from "next-intl";
import { API_URL } from "@/config";
import endpoints from "@/services/endpoints";
import { useQuery } from "@tanstack/react-query";
import { buildQuery } from "@/utils/buildQuery";

const tabParams: Record<DestinationType, any> = {
  local: { is_local: 1 },
  regional: { is_region: 1 },
  global: { is_global: 1 },
};

async function fetchPlans(params: any) {
  const query = buildQuery(params);
  const res = await fetch(`${API_URL}/${endpoints.plans}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
}

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DestinationType>("local");

  const t = useTranslations("");

  const { data: plansData, isLoading } = useQuery({
    queryKey: ["plans", activeTab],
    queryFn: () => fetchPlans(tabParams[activeTab]),
  });

  console.log(plansData, "plansData");

  const handleTabClick = (tab: DestinationType) => {
    setActiveTab(tab);
  };

  return (
    <div className="mb-[75px] bg-[linear-gradient(177.5deg,rgba(240,111,30,0.09)_4.7%,rgba(255,255,255,0.09)_93.18%)] pt-[75px]">
      <div className="container px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
          <h1 className="font-medium text-[24px] md:text-[40px] text-[#1C1C1C]">
            {t("destination.title")}
          </h1>

          <div className="flex gap-[0] md:gap-3 bg-[#1C1C1C0D] rounded-full w-full md:w-auto">
            {Object.entries(tabConfig).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => handleTabClick(key as DestinationType)}
                className={`flex-1 md:flex-initial px-2 py-2 md:px-4 md:py-2 rounded-full text-[14px] md:text-base transition-colors duration-150 ${
                  activeTab === key
                    ? "bg-[#ff7a00] text-white"
                    : "bg-transparent text-[#1C1C1C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[50px]">
          <DestinationCard type={activeTab} data={plansData?.data?.data} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
