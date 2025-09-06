"use client";

import dynamic from "next/dynamic";
import { Loading5755 } from "@/components/loading/loading";
import "@/index.css";

// Layoutlarni dynamic import qilish
const Navbar = dynamic(() => import("@/layouts/Navbar"), {
  ssr: false,
  loading: () => <Loading5755 />,
});
const Main = dynamic(() => import("@/layouts/Main"), {
  ssr: false,
  loading: () => <Loading5755 />,
});
const Tabs = dynamic(() => import("@/layouts/Tabs"), {
  ssr: false,
  loading: () => <Loading5755 />,
});
const Hero = dynamic(() => import("@/layouts/Hero"), {
  ssr: false,
  loading: () => <Loading5755 />,
});
const WHYus = dynamic(() => import("@/layouts/WhyUs"), {
  ssr: false,
  loading: () => <Loading5755 />,
});
const Otzives = dynamic(() => import("@/layouts/Otzives"), {
  ssr: false,
  loading: () => <Loading5755 />,
});
const FAQs = dynamic(() => import("@/layouts/FAQs"), {
  ssr: false,
  loading: () => <Loading5755 />,
});
const Footer = dynamic(() => import("@/layouts/Footer"), {
  ssr: false,
  loading: () => <Loading5755 />,
});

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-[#282728]">
        <Navbar />
        <Main />
      </div>
      <Tabs />
      <Hero />
      <WHYus />
      <Otzives />
      <FAQs />
      <Footer />
    </div>
  );
};

export default Home;
