"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Briefcase, ChevronDown } from "lucide-react"
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
import React, { useState } from "react"

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

const navItems: NavItem[] = [
  {
    href: "/about",
    label: "회사소개",
    children: [
      {
        href: "/about/greeting",
        title: "인사말",
        description: "FAIR인사노무컨설팅의 철학과 비전을 소개합니다",
      },
      {
        href: "/about/profile",
        title: "대표 프로필",
        description: "정광일 대표 공인노무사의 경력, 학력, 강의경력 및 저술활동",
      },
      {
        href: "/about/ethics",
        title: "윤리강령",
        description: "FAIR인사노무컨설팅이 추구하는 8가지 윤리강령",
      },
      {
        href: "/about/location",
        title: "오시는 길",
        description: "FAIR인사노무컨설팅 위치 안내 및 교통편",
      },
    ],
  },
  {
    href: "/services",
    label: "주요 서비스",
    children: [
      {
        href: "/services#labor-consulting",
        title: "노동법 자문",
        description: "기업 운영 전반의 노동법률 리스크 예방 및 대응",
      },
      {
        href: "/services#payroll",
        title: "급여 아웃소싱 및 4대보험",
        description: "정확하고 효율적인 급여 관리 및 4대보험 업무 대행",
      },
      {
        href: "/services#hr-consulting",
        title: "인사노무 컨설팅",
        description: "기업 맞춤형 인사제도 설계 및 운영 지원",
      },
      {
        href: "/services#industrial-accident",
        title: "산업재해",
        description: "산업재해 발생 시 신속한 대응 및 보상 절차 지원",
      },
      {
        href: "/services#unfair-dismissal",
        title: "부당해고 및 징계",
        description: "부당해고, 부당징계 등 노동위원회 사건 대리",
      },
      {
        href: "/services#workplace-harassment",
        title: "직장 내 괴롭힘 및 성희롱",
        description: "직장 내 괴롭힘 예방 및 발생 시 조사, 처리 지원",
      },
    ],
  },
  { href: "/board", label: "공지사항" },
  { href: "/qna", label: "Q&A" },
  { href: "/contact", label: "상담문의" },
]

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
        
        <NavigationMenu className="hidden lg:flex">
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
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      "text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors h-10 px-4 py-2"
                    )}>
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="lg:hidden">
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
            <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white">
              <nav className="grid gap-2 text-base font-medium mt-8">
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
