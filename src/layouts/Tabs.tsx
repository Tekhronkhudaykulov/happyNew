"use client";

import React, { useState } from "react";
import DestinationCard from "../components/destinationCard";
import type { DestinationType } from "../components/destinationCard";
import { tabConfig } from "../data/TabData";
import { useTranslations } from "next-intl";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DestinationType>("local");
  const t = useTranslations("");

  return (
    <div className="mb-[75px] bg-[linear-gradient(177.5deg,rgba(240,111,30,0.09)_4.7%,rgba(255,255,255,0.09)_93.18%)] pt-[75px]">
      <div className="container px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-0">
          <h1 className="font-medium text-[24px] md:text-[40px] text-[#1C1C1C]">
            {t("destination.title")}
          </h1>

          <div className="flex gap-1 md:gap-3 p-1 bg-[#1C1C1C0D] rounded-full w-full md:w-auto">
            {Object.entries(tabConfig).map(([key, tab]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as DestinationType)}
                className={`flex-1 md:flex-initial px-2 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-colors duration-150 ${
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
          <DestinationCard type={activeTab} data={tabConfig[activeTab].data} />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
