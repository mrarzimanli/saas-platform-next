"use client";
import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import { Logo } from "@/resources/images";
import { NavList } from "@/shared/ui/NavList";
import { ArrowRightIcon, ChartIcon, HomeIcon, LogoutIcon, SettingsIcon, TriangleIconFilled } from "@/resources/icons";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { IconBox } from "@/shared/ui/IconBox";
import { AppRoutes, Plans } from "@/shared/types/enums";
import { Modal, ModalFooter, ModalHeader } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/providers/AuthProvider";

type navListItem = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  disabled: boolean;
  href: string;
  onClick: () => void;
};

const Sidebar = () => {
  const tMenu = useTranslations("menu");
  const tButtons = useTranslations("buttons");

  const { auth, handleUpgradePlan, handleLogout } = useAuth();
  const user = auth?.user;

  const navListTop = [
    {
      id: "1",
      title: tMenu("dashboard.title"),
      // desc: tMenu("dashboard.desc"),
      icon: (
        <IconBox
          type="primary"
          color="blue"
          icon={<HomeIcon />}
          size={44}
        />
      ),
      href: AppRoutes.DASHBOARD,
    },
    {
      id: "2",
      title: tMenu("analytics.title"),
      // desc: tMenu("analytics.desc"),
      icon: (
        <IconBox
          type="primary"
          color="pink"
          icon={<ChartIcon />}
          size={44}
        />
      ),
      ...(user?.subscription?.planId !== Plans.BASIC ? { href: AppRoutes.ANALYTICS } : { onClick: handleUpgradePlan }),
      badge: "Pro",
    },
    {
      id: "2",
      title: tMenu("settings.title"),
      // desc: tMenu("settings.desc"),
      icon: (
        <IconBox
          type="primary"
          color="sky"
          icon={<SettingsIcon />}
          size={44}
        />
      ),
      href: AppRoutes.SETTINGS,
    },
  ] as navListItem[];

  const navListBottom = [
    {
      id: "3",
      title: tButtons("logout"),
      desc: tButtons("clickToLogout"),
      icon: (
        <IconBox
          type="primary"
          color="red"
          icon={<LogoutIcon />}
          size={44}
        />
      ),
      onClick: handleLogout,
    },
  ] as navListItem[];

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <Image
            src={Logo}
            alt="Saas Platform"
            height={40}
            width={188}
            priority={true}
          />
        </div>
        <div className={styles.sidebar__body}>
          <NavList list={navListTop} />
        </div>
        <div className={styles.sidebar__footer}>
          <NavList list={navListBottom} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
