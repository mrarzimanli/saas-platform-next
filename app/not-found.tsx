"use client";

import React from "react";
import { useTranslations } from "use-intl";
import styles from "@/shared/styles/not-found.module.scss";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/shared/types/enums";
import { Button } from "@/shared/ui/Button";

const NotFound = () => {
  const router = useRouter();
  const tError = useTranslations("errors.404");
  const tButtons = useTranslations("buttons");

  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__status}>{tError("title")}</div>
      <p className={styles.notFound__message}>{tError("description")}</p>
      <Button onClick={() => router.replace(AppRoutes.ROOT)}>{tButtons("goToDashboard")}</Button>
    </div>
  );
};

export default NotFound;
