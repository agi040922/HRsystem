"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const contactFormSchema = z.object({
  companyName: z.string().min(2, "회사명은 2자 이상 입력해주세요."),
  name: z.string().min(2, "성함은 2자 이상 입력해주세요."),
  contact: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/, "올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  message: z.string().min(10, "요청 내용은 10자 이상 입력해주세요."),
  attachment: z
    .any() // FileList 대신 any 사용하여 서버 환경에서 안전하게 처리
    .optional() // 파일 첨부는 선택 사항
    .refine(
      (files) => {
        // 브라우저 환경에서만 FileList 체크
        if (typeof window === 'undefined') return true // 서버 환경에서는 통과
        if (!files || (files && files.length === 0)) return true
        return files[0]?.size <= 5 * 1024 * 1024
      },
      `파일 크기는 5MB를 초과할 수 없습니다.`,
    )
    .refine(
      (files) => {
        // 브라우저 환경에서만 파일 타입 체크
        if (typeof window === 'undefined') return true // 서버 환경에서는 통과
        if (!files || (files && files.length === 0)) return true
        const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]
        return allowedTypes.includes(files[0]?.type)
      },
      `지원되는 파일 형식: PDF, JPG, PNG, DOC, DOCX`,
    ),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPageClient() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === "attachment" && typeof window !== 'undefined' && value && (value as FileList).length > 0) {
        formData.append(key, (value as FileList)[0])
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })

    try {
      // 임시 성공 처리
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("제출 데이터 (FormData):", data)

      toast({
        title: "요청사항 접수 완료",
        description: "요청사항이 성공적으로 접수되었습니다. 검토 후 신속히 연락드리겠습니다.",
      })
      reset()
    } catch (error) {
      console.error("문의 제출 오류:", error)
      toast({
        title: "오류 발생",
        description: "요청사항 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="container-fluid max-w-7xl py-8 md:py-12 lg:py-16 xl:py-20">
        <div className="text-center mb-8 md:mb-12 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl mb-4"
          >
            기업 서비스 문의
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            강의, 컨설팅, 자문 계약이 필요하시면 언제든지 문의해주세요.
          </motion.p>
        </div>

        <div className="grid gap-8 lg:gap-12 xl:grid-cols-2 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-4 md:px-0"
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl md:text-2xl">기업 서비스 요청</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium">회사명</Label>
                    <Input id="companyName" {...register("companyName")} className="mt-1" />
                                        {errors.companyName && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.companyName.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">성함</Label>
                    <Input id="name" {...register("name")} className="mt-1" />
                    {errors.name && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.name.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contact" className="text-sm font-medium">연락처 (휴대폰)</Label>
                    <Input id="contact" placeholder="010-1234-5678" {...register("contact")} className="mt-1" />
                    {errors.contact && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.contact.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-1" />
                    {errors.email && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.email.message)}</p>}
                  </div>
 
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">요청 내용</Label>
                    <Textarea id="message" rows={5} {...register("message")} className="mt-1 resize-none" />
                    {errors.message && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.message.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="attachment" className="text-sm font-medium">첨부파일 (선택, 5MB 이하)</Label>
                    <Input
                      id="attachment"
                      type="file"
                      {...register("attachment")}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="mt-1"
                    />
                    {errors.attachment && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.attachment.message)}</p>}
                    <p className="text-xs text-muted-foreground mt-1">지원 파일: PDF, JPG, PNG, DOC, DOCX</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 md:p-4 rounded-md border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm">서비스 안내</h4>
                        <ul className="text-xs text-yellow-600 dark:text-yellow-400 list-disc pl-4 mt-1 space-y-0.5 leading-relaxed">
                          <li>모든 서비스는 기업 대상으로 제공됩니다.</li>
                          <li>상담은 예약제로 진행되며, 전화로 사전 예약해주세요.</li>
                          <li>기업 상담은 유료로 진행됩니다 (10만원, 부가세 별도).</li>
                          <li>요청 접수 후 영업일 기준 1~2일 이내에 연락드립니다.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "전송 중..." : "서비스 요청하기"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-4 md:px-0"
          >
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl md:text-2xl">연락처 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">전화 문의 및 예약</h3>
                      <a href="tel:02-1234-5678" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                        02-1234-5678
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">이메일 문의</h3>
                      <a href="mailto:contact@law-firm.co.kr" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors break-all">
                        contact@law-firm.co.kr
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">방문 상담</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        서울특별시 강남구 테헤란로 123, 4층
                        <br />
                        (역삼역 5번 출구 도보 5분)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl md:text-2xl">상담 및 서비스 시간</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm md:text-base">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">평일</span>
                      <span className="text-muted-foreground">09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">토요일</span>
                      <span className="text-muted-foreground">09:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">일요일 및 공휴일</span>
                      <span className="text-muted-foreground">휴무</span>
                    </div>
                    <div className="pt-2 border-t text-xs md:text-sm text-muted-foreground">
                      <p>* 상담은 예약제로 진행되며, 사전 예약 필수입니다.</p>
                      <p>* 기업 상담은 유료로 진행됩니다 (10만원, 부가세 별도).</p>
                      <p>* 강의 및 컨설팅 일정은 별도 협의 가능합니다.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
