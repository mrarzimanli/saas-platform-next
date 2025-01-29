import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootLayoutView from "@/views/rootLayoutView";
import "@/shared/styles/global.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SaaS Platform",
  description: "This platform allows users with different subscription plans to access various data and perform actions.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootLayoutView font={inter}>{children}</RootLayoutView>;
}
