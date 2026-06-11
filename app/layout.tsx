import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getLocale, getMessages } from "next-intl/server"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "./providers"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FAIR인사노무컨설팅",
  description: "전문적인 노무 상담 및 솔루션을 제공합니다.",
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "naver-site-verification": "30b5f0749e64b98e4970e9906e86ed17df7ed755",
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
            </div>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
