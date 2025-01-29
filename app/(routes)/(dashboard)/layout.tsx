import type { Metadata } from "next";
import DashboardLayoutView from "./views/dashboardLayoutView";
import { AuthProvider } from "@/providers/AuthProvider";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: "SaaS Platform",
  description: "This platform allows users with different subscription plans to access various data and perform actions.",
};

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SkeletonTheme
      baseColor="#ffffff"
      highlightColor="#f2f4fc"
      borderRadius={12}
    >
      <AuthProvider>
        <DashboardLayoutView>{children}</DashboardLayoutView>
      </AuthProvider>
    </SkeletonTheme>
  );
};

export default DashboardLayout;
