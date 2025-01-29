"use client";

import React, { FC } from "react";
import styles from "./Header.module.scss";
import { Profile } from "@/shared/ui/Profile";
import { Dropdown } from "../Dropdown";
import { useLanguage } from "@/providers/LanguageProvider";

type HeaderProps = {
  title: string;
  desc?: string;
};

const languages = [
  { id: 0, text: "English", key: "en" },
  { id: 1, text: "Azerbaijani", key: "az" },
];

const Header: FC<HeaderProps> = ({ title, desc }) => {
  const { locale, setLocale } = useLanguage();

  const handleLanguageChange = (id: number | string) => {
    const selectedLanguage = languages.find((language) => language.id === id);
    if (selectedLanguage) {
      setLocale(selectedLanguage.key);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <h1 className={styles.header__title}>{title}</h1>
        {desc && <p className={styles.header__desc}>{desc}</p>}
      </div>
      <div className={styles.header__actions}>
        <Dropdown
          name="language"
          position="bottom"
          data={languages}
          defaultValue={languages.find((l) => l.key === locale)}
          size="xs"
          onSelect={handleLanguageChange}
        />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
