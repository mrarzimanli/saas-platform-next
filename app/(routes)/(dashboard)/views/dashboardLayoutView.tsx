"use client";
import { Sidebar } from "@/shared/ui/Sidebar";
import styles from "../shared/styles/layout.module.scss";
import { Header } from "@/shared/ui/Header";
import { useTranslations } from "next-intl";
import { AuthProvider } from "@/providers/AuthProvider";
import { usePathname } from "next/navigation";
import { getRouteKey } from "@/shared/utils/getRouteKey";
import { Section } from "@/shared/ui/Section";

const DashboardLayoutView = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tRoutes = useTranslations("routes");
  const pathname = usePathname();
  const routeKey = getRouteKey(pathname);

  return (
    <AuthProvider>
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.main}>
          <Header title={tRoutes(routeKey)} />
          <Section>{children}</Section>
        </main>
      </div>
    </AuthProvider>
  );
};

export default DashboardLayoutView;
