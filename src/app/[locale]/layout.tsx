import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "@/app/[locale]/globals.css";
import "@/index.css";
import { Suspense } from "react";
import { Loading5755 } from "@/components/loading/loading";
import { AuthModalProvider } from "@/providers/AuthModalProvider";
import { AutoScrollToTop } from "@/components/scrollToTop";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "@/providers/ToastProvider";

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <AuthModalProvider>
              <AutoScrollToTop/>
              <Suspense fallback={<Loading5755 />}>
                <ToastProvider />
                {children}
              </Suspense>
            </AuthModalProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
