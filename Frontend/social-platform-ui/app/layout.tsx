import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/layout/Header";
import { I18nProvider } from "./lib/i18nContext";
import { ReactQueryProvider } from "./providers/provider";
import { ToastProvider } from "./components/common/Toast/ToastContext";
import { cookies } from "next/headers";
import { defaultLocale, getTranslation, Locale } from "./lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Platform",
  description: "Social Platform built with Next.js",
};

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const isSignedIn = true;
  const cookieStore = await cookies()
  const locale = (cookieStore.get('locale')?.value as Locale) || defaultLocale;
  const messages = getTranslation(locale);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        antialiased 
        h-screen overflow-hidden
        bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
        flex flex-col`}
      >
        <ReactQueryProvider>
          <I18nProvider initialLocale={locale} initialMessages={messages}>
            <ToastProvider>
              <main className="flex-1 overflow-hidden min-h-0">{children}</main>
            </ToastProvider>
          </I18nProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}