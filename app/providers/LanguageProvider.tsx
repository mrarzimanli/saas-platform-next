"use client";

import Loading from "@/loading";
import { NextIntlClientProvider } from "next-intl";
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";

interface LanguageContextType {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState("en");
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const loadMessages = async () => {
      const localeMessages = (await import(`../../messages/${locale}.json`)).default;
      setMessages(localeMessages);
    };

    loadMessages();
  }, [locale]);

  if (!messages) {
    return <Loading />;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
