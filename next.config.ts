// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["crm.uztu.uz"],
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "admin.marca.uz" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ru",
        permanent: false,
        locale: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);