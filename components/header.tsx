"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Menu, ChevronDown, ExternalLink } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import React, { useState, useEffect } from "react"
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

interface NavItem {
  href: string
  label: string
  children?: NavSubItem[]
  description?: string // For top-level items in mobile menu
}

interface NavSubItem {
  href: string
  title: string
  description: string
}

// FAIR CRM 플랫폼 로그인 URL (기획서 기준: efm.fairhr.net 외부 링크)
const CRM_LOGIN_URL = "https://efm.fairhr.net"

// navItems는 이제 컴포넌트 내부에서 번역과 함께 생성됩니다

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border border-transparent hover:border-border/50",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-semibold leading-none text-foreground">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('ko')
  
  // useTranslations를 try-catch로 감싸서 에러 처리
  let t: any;
  try {
    t = useTranslations();
  } catch (error) {
    // 컨텍스트가 없을 경우 기본 함수 제공
    t = (key: string) => key;
  }

  // 번역된 네비게이션 아이템 생성
  // 기획서 기준: 홈 / FAIR CRM(신규) / 회사소개 / 공지사항 / Q&A / 상담 신청 + 우측 CRM 로그인 버튼
  const navItems: NavItem[] = [
    {
      href: "/fair-crm",
      label: t('mainNav.fairCrm'),
    },
    {
      href: "/about/greeting",
      label: t('mainNav.about'),
      children: [
        {
          href: "/about/greeting",
          title: t('aboutMenu.greeting.title'),
          description: t('aboutMenu.greeting.description'),
        },
        {
          href: "/about/ethics",
          title: t('aboutMenu.ethics.title'),
          description: t('aboutMenu.ethics.description'),
        },
        {
          href: "/about/location",
          title: t('aboutMenu.location.title'),
          description: t('aboutMenu.location.description'),
        },
      ],
    },
    {
      href: "/services",
      label: t('servicesNav.label'),
      children: t.raw('servicesNav.items') as NavSubItem[],
    },
    { href: "/board", label: t('mainNav.board') },
    { href: "/newsletter", label: t('mainNav.newsletter') },
    { href: "/contact", label: t('mainNav.contact') },
  ]

  // 로컬 스토리지에서 언어 가져오기
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'ko';
    setCurrentLocale(savedLocale);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    // 커스텀 이벤트는 LanguageSwitcher에서 발생시킴
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 shadow-sm">
      <div className="container-fluid max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 transition-opacity hover:opacity-80">
          <Image 
            src="/logo.png" 
            alt="FAIR인사노무컨설팅 로고" 
            width={180} 
            height={40} 
            className="h-8 w-auto max-w-[120px] sm:max-w-[180px]"
            priority
          />
        </Link>
        
        <div className="hidden lg:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-primary transition-colors bg-transparent hover:bg-gray-50 data-[state=open]:bg-gray-50 data-[state=open]:text-primary h-10 px-4 py-2">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[400px] p-4">
                      <ul className="grid w-full gap-2 grid-cols-1">
                        {item.children.map((child) => (
                          <ListItem key={child.title} href={child.href} title={child.title}>
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild className={cn(
                      navigationMenuTriggerStyle(),
                      "text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors h-10 px-4 py-2"
                    )}>
                      <Link href={item.href}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <LanguageSwitcher
            currentLocale={currentLocale}
            onLanguageChange={handleLanguageChange}
          />
          {/* 기존 CRM 고객용 로그인 버튼 — efm.fairhr.net 외부 이동 */}
          <a
            href={CRM_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-primary/30 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {t('header.crmLogin')}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          {/* 모바일: CRM 로그인 아이콘 버튼 (작게) */}
          <a
            href={CRM_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 h-9 px-2.5 rounded-md border border-primary/30 text-xs font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            aria-label={t('header.crmLogin')}
          >
            CRM
            <ExternalLink className="h-3 w-3" />
          </a>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t('header.menu')}</SheetTitle>
                <SheetDescription>사이트 메뉴를 탐색하세요</SheetDescription>
              </SheetHeader>
              <div className="flex justify-end mt-4 mb-2">
                <LanguageSwitcher 
                  currentLocale={currentLocale}
                  onLanguageChange={handleLanguageChange}
                />
              </div>
              <nav className="grid gap-2 text-base font-medium mt-4">
                {navItems.map((item) => (
                  <React.Fragment key={item.label}>
                    {item.children ? (
                      <div className="grid gap-1">
                        <div className="flex items-center justify-between text-gray-900 px-3 py-3 border-b border-gray-200">
                          <span className="font-semibold">{item.label}</span>
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="grid gap-1 pl-4 py-2 bg-gray-50 rounded-lg ml-2 mr-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className="text-sm text-gray-600 hover:text-primary px-3 py-2 rounded-md hover:bg-white transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-900 hover:text-primary px-3 py-3 rounded-md hover:bg-gray-50 transition-colors border-b border-gray-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
