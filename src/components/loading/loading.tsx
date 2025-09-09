"use client";

import { useEffect, useState } from "react";
import "./loading.css";
import { ASSETS } from "../../assets";
import Image from "next/image";

const Loading5755 = ({ value }: { value?: number }) => {
  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    if (typeof value === "number") {
      setPercentage(Math.max(0, Math.min(100, Math.floor(value))));
      return;
    }
    const interval = setInterval(() => {
      setPercentage((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 5);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="loading-container ">
      <div className="loading-5755">
        <div className="logo">
          <Image src={ASSETS.logowhite} alt="HappyTel Logo" />
        </div>
        <div className="progress-circle">
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

const Loading5756 = () => {
  const [percentage, setPercentage] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 5);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-5756">
        <div className="logo">
          <Image src={ASSETS.logowhite} alt="HappyTel Logo" />
        </div>
        <div className="progress-line">
          <div
            className="progress-dot"
            style={{ left: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Loading5757 = () => {
  return (
    <div className="loading-container">
      <div className="loading-5757">
        <div className="logo">
          <Image src={ASSETS.logowhite} alt="HappyTel Logo" />
        </div>
        <div className="circular-progress"></div>
      </div>
    </div>
  );
};

export { Loading5757, Loading5756, Loading5755 };
