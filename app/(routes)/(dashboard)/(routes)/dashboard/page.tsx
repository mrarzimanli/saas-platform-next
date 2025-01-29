import type { Metadata } from "next";
import DashboardPageView from "../../views/dashboardPageView";

export const metadata: Metadata = {
  title: "SaaS Platform - Dashboard",
  description: "This platform allows users with different subscription plans to access various data and perform actions.",
};

export default function Page() {
  return <DashboardPageView />;
}
