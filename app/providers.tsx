'use client';

import { useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';

interface ProvidersProps {
  children: React.ReactNode;
  initialLocale?: string;
  initialMessages?: Record<string, any>;
}

export function I18nProvider({
  children,
  initialLocale = 'ko',
  initialMessages = {},
}: ProvidersProps) {
  const [locale, setLocale] = useState(initialLocale);
  const [messages, setMessages] = useState<any>(initialMessages);
  const [isClient, setIsClient] = useState(false);

  const loadMessages = async (newLocale: string) => {
    try {
      const [common, navigation, home, about, services, board, qna, contact, fairCrm] = await Promise.all([
        import(`../messages/${newLocale}/common.json`),
        import(`../messages/${newLocale}/navigation.json`),
        import(`../messages/${newLocale}/home.json`),
        import(`../messages/${newLocale}/about.json`),
        import(`../messages/${newLocale}/services.json`),
        import(`../messages/${newLocale}/board.json`),
        import(`../messages/${newLocale}/qna.json`),
        import(`../messages/${newLocale}/contact.json`),
        import(`../messages/${newLocale}/fairCrm.json`),
      ]);

      setMessages({
        ...common.default,
        ...navigation.default,
        ...home.default,
        ...about.default,
        services: services.default,
        board: board.default,
        qna: qna.default,
        contact: contact.default,
        fairCrm: fairCrm.default,
      });
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const savedLocale = localStorage.getItem('locale') || initialLocale;
    setLocale(savedLocale);
    if (savedLocale !== initialLocale) {
      loadMessages(savedLocale);
    }
  }, [initialLocale]);

  useEffect(() => {
    if (!isClient) return;

    const handleLocaleChange = (event: CustomEvent) => {
      const newLocale = event.detail.locale;
      setLocale(newLocale);
      localStorage.setItem('locale', newLocale);
      loadMessages(newLocale);
    };

    window.addEventListener('localeChange' as any, handleLocaleChange);
    return () => {
      window.removeEventListener('localeChange' as any, handleLocaleChange);
    };
  }, [isClient]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="Asia/Seoul">
      {children}
    </NextIntlClientProvider>
  );
}
