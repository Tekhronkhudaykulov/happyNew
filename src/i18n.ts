// src/i18n.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { locales, defaultLocale } from "./messages/config"; // ← отдельный config для routing

export default getRequestConfig(async ({ requestLocale }) => {
  // Await requestLocale из middleware
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  console.log("[i18n] Requested:", requested, "→ Valid locale:", locale);

  // Dynamic import messages (v4 рекомендует)
  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});