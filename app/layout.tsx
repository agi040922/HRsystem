import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getLocale, getMessages } from "next-intl/server"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "./providers"
import Header from "@/components/header"
import Footer from "@/components/footer"
import KakaoChatButton from "@/components/kakao-chat-button"
import SalesAgentWidget from "@/components/sales/sales-agent-widget"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"
import { SEO_KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 공인노무사 HR 자문·FAIR CRM`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    title: `${SITE_NAME} | 공인노무사 HR 자문·FAIR CRM`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 공인노무사 HR 자문·FAIR CRM`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  other: {
    "naver-site-verification": "30b5f0749e64b98e4970e9906e86ed17df7ed755",
    // 구글 서치콘솔 URL 접두어 속성(https://www.fairhr.net/) 소유확인.
    // ⚠️ 지우면 소유확인이 풀려 색인 현황·사이트맵 제출을 볼 수 없게 된다.
    "google-site-verification": "yzsQcrGihTWtX49XpCR5sGifhxVIMCpcYunqPGlqFpY",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} overflow-x-hidden w-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <I18nProvider initialLocale={locale} initialMessages={messages as Record<string, any>}>
            <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
              <Header />
              <main className="flex-1 w-full overflow-x-hidden pt-16">{children}</main>
              <Footer />
              <KakaoChatButton />
              <SalesAgentWidget />
            </div>
            <Toaster />
            <Analytics />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
