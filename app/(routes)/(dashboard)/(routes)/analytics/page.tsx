import type { Metadata } from "next";
import AnalyticsPageView from "../../views/analyticsPageView";

export const metadata: Metadata = {
  title: "SaaS Platform - Analytics",
  description: "This platform allows users with different subscription plans to access various data and perform actions.",
};

export default function Page() {
  return <AnalyticsPageView />;
}
