import type { Metadata } from "next";
import SettingsPageView from "../../views/settingsPageView";

export const metadata: Metadata = {
  title: "SaaS Platform - Settings",
  description: "This platform allows users with different subscription plans to access various data and perform actions.",
};

export default function Page() {
  return <SettingsPageView />;
}
