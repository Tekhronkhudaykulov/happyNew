"use client";

import { useRouter } from "next/navigation";
import { FooterNav } from "@/layouts/FooterNav";
import Navbar from "@/layouts/Navbar";
import { ArrowLeft, LogOut } from "lucide-react";
import { ASSETS } from "@/assets";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useAuthModal } from "@/providers/AuthModalProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { APP_ROUTES } from "@/router/path";
import endpoints from "@/services/endpoints";
import { API_URL } from "@/config";

const tokenName = "token";

async function fetchPlans() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${endpoints.profile}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

const Profile = () => {
  const t = useTranslations();
  const router = useRouter();
  const { openAuthModal } = useAuthModal();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchPlans,
  });

  // ✨ Edit qilish uchun local state
  const [name, setName] = useState("");

  const [passport, setPassport] = useState("");
  const [phone, setPhone] = useState("");
  const [modalPhone, setModalPhone] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [activateToken, setActivateToken] = useState<string | null>(null);

  // Ma’lumot kelganda state ichiga yozib qo‘yish
  useEffect(() => {
    if (profileData) {
      setName(profileData?.data?.full_name || "");
      setPassport(profileData?.data?.passport || "");
      setPhone(profileData?.data?.phone || "");
    }
  }, [profileData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivateToken(localStorage.getItem("token"));
    }
  }, []);

  const handleModalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    setPhone(value);
    if (value.startsWith("998")) {
      value = value.substring(3);
    }
    if (value.length > 9) value = value.substring(0, 9);
    if (value.length > 0) {
      const formatted = `+998 ${value.substring(0, 2)} ${value.substring(
        2,
        5
      )} ${value.substring(5, 7)} ${value.substring(7, 9)}`.trim();
      e.target.value = formatted;
      setModalPhone(formatted);
    } else {
      e.target.value = "";
      setModalPhone("");
    }
  };

  const token = localStorage.getItem("token");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(`${API_URL}/${endpoints.profile}`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: data,
      });

      const dataJson = await res.json();

      if (!dataJson.success) {
        throw new Error(dataJson.message || "Noma’lum xato");
      }

      return dataJson;
    },
    onSuccess: (res) => {
      console.log("Updated:", res);
    },
    onError: (err: any) => {
      console.log(err, "errorlar");
    },
  });

  const handleSave = () => {
    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("phone", phone);

    if (file) {
      formData.append("passport_image", file);
    }

    mutate(formData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // faqat ko‘rsatish uchun
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="py-6 md:pb-6 pb-[80px] container relative">
        {localStorage.getItem(tokenName) ? (
          <>
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
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
              <h1 className="font-bold text-xl md:text-2xl lg:text-[35px] leading-tight tracking-[-0.06em] text-black">
                {t("ready.personal")}
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full rounded-[12px] p-4 md:p-6 bg-[#1C1C1C0D]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block text-black">
                      {t("ready.name")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("ready.name")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-transparent text-black"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block text-black">
                      {t("ready.passport")}
                    </label>
                    {/* <input
                      type="text"
                      placeholder={t("ready.passport")}
                      value={passport}
                      onChange={(e) => setPassport(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-transparent text-black"
                    /> */}

                    {profileData?.data?.passport_image ? (
                      // Agar passport_image mavjud bo‘lsa rasmni chiqarish
                      <div className="flex flex-col gap-2">
                        {/* <Image
                          src={`${API_IMAGE}/${profileData?.data?.passport_image}`}
                          alt="Passport"
                          className="w-[200px] h-auto rounded-lg border"
                        /> */}
                        {/* <p className="text-sm text-gray-600">
                          {profileData?.data?.passport_image.split("/").pop()}
                        </p> */}
                      </div>
                    ) : (
                      // Agar passport_image yo‘q bo‘lsa — yuklash inputi
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full bg-white p-2 text-[#F06F1E] rounded-lg"
                          value={fileName || "Загрузить"}
                          readOnly
                        />
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileUpload}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block text-black">
                      {t("ready.phonenum")}
                    </label>
                    <input
                      type="tel"
                      placeholder={t("ready.phonenum")}
                      value={
                        modalPhone || `+${profileData?.data?.phone}` || "+998 "
                      }
                      onChange={handleModalPhoneChange}
                      className="w-full p-3 rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-transparent text-black"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/4 flex">
                <div className="w-full flex flex-col bg-[#ED713C] rounded-[12px] p-6 text-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm md:text-[14px] font-normal">
                      {t("ready.keshbek")}
                    </h2>
                    <Image
                      className="md:w-fit md:h-fit h-8 w-24"
                      src={ASSETS.logowhite}
                      alt=""
                    />
                  </div>
                  <h1 className="text-[30px] md:text-[35px] font-bold mt-4">
                    {profileData?.data?.balance} UZS
                  </h1>
                  <p className="text-xs md:text-[14px] mt-auto">
                    {t("ready.orders")}: {profileData?.ordersCount ?? 0}
                  </p>
                </div>
              </div>

              <Image
                src={ASSETS.bgg2}
                alt="Background 1"
                className="absolute md:top-[103px] top-[370px] right-[15px] rounded-[12px] md:right-[18px] h-[75px] w-[175px]  md:w-[225px] md:h-[95px]"
              />
              <Image
                src={ASSETS.bgg}
                alt="Background 2"
                className="absolute md:top-[218px] top-[435px] left-[15px] rounded-[12px] md:right-[187px] h-[75px] w-[175px]  md:w-[225px] md:h-[95px]"
              />
            </div>

            {activateToken ? (
              <div className="flex justify-center items-center mt-[20px]">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push(`${APP_ROUTES.HOME}`);
                  }}
                  className="text-black flex items-center gap-x-[10px] text-[22px]"
                >
                  <LogOut size={22} /> {t("ready.logout")}
                </button>
              </div>
            ) : (
              <div>
                <label className="text-sm text-[#1C1C1C0D] font-medium  block mb-[23px]"></label>
                <button
                  onClick={handleSave}
                  className="w-full p-3 bg-[#ED713C] text-white rounded-lg"
                >
                  {isPending ? "Loading..." : "Сохранить"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-500">Please log in to view your profile.</p>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <FooterNav openAuthModal={openAuthModal} />
      </div>
    </div>
  );
};

export default Profile;
