import type { Metadata } from "next";
import AuthLayoutContent from "./views/authLayoutView";

export const metadata: Metadata = {
  title: "SaaS Platform",
  description: "This platform allows users with different subscription plans to access various data and perform actions.",
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthLayoutContent>{children}</AuthLayoutContent>;
}
