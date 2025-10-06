'use client';

import { useState } from 'react';
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TestPageClientProps {
  messages: any;
  locale: string;
}

interface TestPageContentProps {
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
}

function TestPageContent({ currentLocale, onLanguageChange }: TestPageContentProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t('test.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('test.description')}
            </p>
          </div>
          <LanguageSwitcher 
            currentLocale={currentLocale}
            onLanguageChange={onLanguageChange}
          />
        </div>

        <Separator />

        {/* 현재 언어 표시 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t('test.currentLanguage')}
              <Badge variant="secondary">
                {t('navigation.language')}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* 메인 콘텐츠 */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('test.content.paragraph1')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                {t('test.content.paragraph2')}
              </p>
              <p className="text-gray-700">
                {t('test.content.paragraph3')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('test.features.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {t('test.features.feature1')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {t('test.features.feature2')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  {t('test.features.feature3')}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 공통 버튼들 */}
        <Card>
          <CardHeader>
            <CardTitle>{t('common.welcome')}</CardTitle>
            <CardDescription>
              {t('common.hello')} - {t('common.goodbye')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{t('common.yes')}</Badge>
              <Badge variant="outline">{t('common.no')}</Badge>
              <Badge variant="outline">{t('common.save')}</Badge>
              <Badge variant="outline">{t('common.cancel')}</Badge>
              <Badge variant="outline">{t('common.edit')}</Badge>
              <Badge variant="outline">{t('common.delete')}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 네비게이션 예시 */}
        <Card>
          <CardHeader>
            <CardTitle>{t('navigation.home')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>{t('navigation.home')}</Badge>
              <Badge>{t('navigation.about')}</Badge>
              <Badge>{t('navigation.services')}</Badge>
              <Badge>{t('navigation.contact')}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TestPageClient({ messages: initialMessages, locale: initialLocale }: TestPageClientProps) {
  const [currentLocale, setCurrentLocale] = useState(initialLocale);
  const [messages, setMessages] = useState(initialMessages);

  const handleLanguageChange = async (newLocale: string) => {
    try {
      // 새로운 언어의 메시지를 동적으로 로드
      const newMessages = (await import(`../../../messages/${newLocale}.json`)).default;
      setMessages(newMessages);
      setCurrentLocale(newLocale);
    } catch (error) {
      console.error('언어 파일을 로드하는데 실패했습니다:', error);
    }
  };

  return (
    <NextIntlClientProvider messages={messages} locale={currentLocale}>
      <TestPageContent 
        currentLocale={currentLocale}
        onLanguageChange={handleLanguageChange}
      />
    </NextIntlClientProvider>
  );
}
