import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/layout/Header";
import { I18nProvider } from "./lib/i18nContext";

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

export default function RootLayout({ children }: RootLayoutProps) {
  const isSignedIn = true;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
        antialiased 
        h-screen overflow-hidden
        bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100
        flex flex-col`}
      >
        <I18nProvider>
          <main className="flex-1 overflow-hidden min-h-0">{children}</main>
        </I18nProvider> 
      </body>
    </html>
  );
}