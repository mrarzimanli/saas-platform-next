"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/shared/styles/errors.module.scss";
import { Button } from "./shared/ui/Button";
import { AppRoutes } from "./shared/types/enums";
import { useTranslations } from "use-intl";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  const tError = useTranslations("errors.ui");
  const tButtons = useTranslations("buttons");

  useEffect(() => {
    console.error("Error caught in Error Boundary:", error);
  }, [error]);

  return (
    <div className={styles.error}>
      <div className={styles.error__status}>{tError("title")}</div>
      <p className={styles.error__message}>{tError("description")}</p>
      <Button onClick={() => router.replace(AppRoutes.ROOT)}>{tButtons("goToDashboard")}</Button>
    </div>
  );
}
