"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Phone, Mail, MapPin, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTranslations } from 'next-intl'
import PageBanner from "@/components/page-banner"

const EMPLOYEE_OPTIONS = ["under10", "10to50", "50to100", "100to300", "over300"] as const
const SERVICE_OPTIONS = [
  "advisory",
  "diagnosis",
  "safety",
  "payroll",
  "dispute",
  "harassment",
  "other",
] as const

const contactFormSchema = z.object({
  companyName: z.string().min(2, "회사명은 2자 이상 입력해주세요."),
  name: z.string().min(2, "성함은 2자 이상 입력해주세요."),
  contact: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/, "올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)"),
  email: z.string().email("올바른 이메일 주소를 입력해주세요."),
  employeeCount: z.enum(EMPLOYEE_OPTIONS, {
    required_error: "직원 규모를 선택해주세요.",
    invalid_type_error: "직원 규모를 선택해주세요.",
  }),
  interestedServices: z
    .array(z.enum(SERVICE_OPTIONS))
    .min(1, "관심 서비스를 1개 이상 선택해주세요."),
  message: z.string().min(10, "요청 내용은 10자 이상 입력해주세요."),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "개인정보 수집·이용에 동의해주세요." }),
  }),
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

/** 숫자만 추출해서 010-1234-5678 형태로 자동 포맷 (11자리는 3-4-4, 10자리는 3-3-4) */
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

export default function ContactPageClient() {
  const t = useTranslations('contact')
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      interestedServices: [],
    },
  })

  // register의 onChange를 가로채서 포맷된 값으로 전달
  const contactField = register("contact")

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setSubmitError(null)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key === "attachment" && typeof window !== 'undefined' && value && (value as FileList).length > 0) {
        formData.append(key, (value as FileList)[0])
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })
      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.message || "요청사항 제출 중 오류가 발생했습니다.")
      }

      reset()
      setSubmitted(true)
      // 완료 화면이 보이도록 폼 영역 상단으로 스크롤
      if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("문의 제출 오류:", error)
      const message =
        error instanceof Error && error.message
          ? error.message
          : "요청사항 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
      setSubmitError(message)
      toast({
        title: "오류 발생",
        description: message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full overflow-x-hidden">
      {/* 페이지 배너 */}
      <PageBanner 
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="/FAIR000.png"
      />
      
      <div className="container-fluid max-w-7xl py-4 md:py-6 lg:py-8 xl:py-12">

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
                <CardTitle className="text-xl md:text-2xl">{t('form.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="py-10 text-center">
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                    <h3 className="mt-5 text-xl md:text-2xl font-bold text-gray-900">
                      상담 신청이 접수되었습니다
                    </h3>
                    <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                      입력하신 이메일로 접수 확인 메일을 보내드렸습니다.
                      <br />
                      검토 후 영업일 기준 1~2일 이내에 연락드리겠습니다.
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      급한 문의는{" "}
                      <a href="tel:02-387-9869" className="font-semibold text-primary hover:underline">
                        02-387-9869
                      </a>
                      로 전화 주세요.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      새 상담 신청 작성하기
                    </Button>
                  </div>
                ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                  <div>
                    <Label htmlFor="companyName" className="text-sm font-medium">{t('form.fields.companyName.label')}</Label>
                    <Input id="companyName" placeholder={t('form.fields.companyName.placeholder')} {...register("companyName")} className="mt-1" />
                    {errors.companyName && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.companyName.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">{t('form.fields.name.label')}</Label>
                    <Input id="name" placeholder={t('form.fields.name.placeholder')} {...register("name")} className="mt-1" />
                    {errors.name && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.name.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="contact" className="text-sm font-medium">{t('form.fields.contact.label')}</Label>
                    <Input
                      id="contact"
                      type="tel"
                      inputMode="numeric"
                      placeholder={t('form.fields.contact.placeholder')}
                      {...contactField}
                      onChange={(e) => {
                        e.target.value = formatPhoneNumber(e.target.value)
                        contactField.onChange(e)
                      }}
                      className="mt-1"
                    />
                    {errors.contact && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.contact.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">{t('form.fields.email.label')}</Label>
                    <Input id="email" type="email" placeholder={t('form.fields.email.placeholder')} {...register("email")} className="mt-1" />
                    {errors.email && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.email.message)}</p>}
                  </div>
 
                  <div>
                    <Label htmlFor="employeeCount" className="text-sm font-medium">
                      {t('form.fields.employeeCount.label')}
                    </Label>
                    <Controller
                      name="employeeCount"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger id="employeeCount" className="mt-1">
                            <SelectValue placeholder={t('form.fields.employeeCount.placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            {EMPLOYEE_OPTIONS.map((key) => (
                              <SelectItem key={key} value={key}>
                                {t(`form.fields.employeeCount.options.${key}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.employeeCount && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">
                        {t('form.fields.employeeCount.error')}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium">
                      {t('form.fields.interestedServices.label')}
                    </Label>
                    <Controller
                      name="interestedServices"
                      control={control}
                      render={({ field }) => (
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {SERVICE_OPTIONS.map((key) => {
                            const checked = field.value?.includes(key) ?? false
                            return (
                              <label
                                key={key}
                                htmlFor={`service-${key}`}
                                className="flex items-center gap-2 rounded-md border border-border/50 px-3 py-2 text-sm cursor-pointer hover:bg-accent/50 transition-colors"
                              >
                                <Checkbox
                                  id={`service-${key}`}
                                  checked={checked}
                                  onCheckedChange={(value) => {
                                    const current = field.value ?? []
                                    if (value) {
                                      field.onChange([...current, key])
                                    } else {
                                      field.onChange(current.filter((v) => v !== key))
                                    }
                                  }}
                                />
                                <span>{t(`form.fields.interestedServices.options.${key}`)}</span>
                              </label>
                            )
                          })}
                        </div>
                      )}
                    />
                    {errors.interestedServices && (
                      <p className="text-xs sm:text-sm text-red-500 mt-1">
                        {t('form.fields.interestedServices.error')}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium">{t('form.fields.message.label')}</Label>
                    <Textarea id="message" rows={5} placeholder={t('form.fields.message.placeholder')} {...register("message")} className="mt-1 resize-none" />
                    {errors.message && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.message.message)}</p>}
                  </div>
                  <div>
                    <Label htmlFor="attachment" className="text-sm font-medium">{t('form.fields.attachment.label')}</Label>
                    <Input
                      id="attachment"
                      type="file"
                      {...register("attachment")}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="mt-1"
                    />
                    {errors.attachment && <p className="text-xs sm:text-sm text-red-500 mt-1">{String(errors.attachment.message)}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{t('form.fields.attachment.supportedFormats')}</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 md:p-4 rounded-md border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 text-sm">{t('form.serviceInfo.title')}</h4>
                        <ul className="text-xs text-yellow-600 dark:text-yellow-400 list-disc pl-4 mt-1 space-y-0.5 leading-relaxed">
                          <li>{t('form.serviceInfo.item1')}</li>
                          <li>{t('form.serviceInfo.item2')}</li>
                          <li>{t('form.serviceInfo.item3')}</li>
                          <li>{t('form.serviceInfo.item4')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border border-border/60 bg-slate-50 p-3 md:p-4">
                    <Controller
                      name="privacyConsent"
                      control={control}
                      render={({ field }) => (
                        <label
                          htmlFor="privacyConsent"
                          className="flex items-start gap-2 text-sm cursor-pointer"
                        >
                          <Checkbox
                            id="privacyConsent"
                            checked={field.value === true}
                            onCheckedChange={(v) => field.onChange(v === true)}
                            className="mt-0.5"
                          />
                          <span>
                            <span className="font-medium text-gray-900">
                              {t('form.fields.privacyConsent.label')}
                            </span>
                            <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                              {t('form.fields.privacyConsent.description')}
                            </span>
                          </span>
                        </label>
                      )}
                    />
                    {errors.privacyConsent && (
                      <p className="text-xs sm:text-sm text-red-500 mt-2">
                        {t('form.fields.privacyConsent.error')}
                      </p>
                    )}
                  </div>
                  {submitError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t('form.submitting') : t('form.submit')}
                  </Button>
                </form>
                )}
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
                  <CardTitle className="text-xl md:text-2xl">{t('contactInfo.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">{t('contactInfo.phone.label')}</h3>
                      <a href="tel:02-387-9869" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors">
                        {t('contactInfo.phone.value')}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">{t('contactInfo.email.label')}</h3>
                      <a href="mailto:fairhr@nate.com" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors break-all">
                        {t('contactInfo.email.value')}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">{t('contactInfo.address.label')}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {t('contactInfo.address.value')}
                        <br />
                        {t('contactInfo.address.description')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl md:text-2xl">{t('businessHours.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm md:text-base">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t('businessHours.weekdays')}</span>
                      <span className="text-muted-foreground">{t('businessHours.weekdaysTime')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t('businessHours.saturday')}</span>
                      <span className="text-muted-foreground">{t('businessHours.saturdayTime')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t('businessHours.sunday')}</span>
                      <span className="text-muted-foreground">{t('businessHours.sundayTime')}</span>
                    </div>
                    <div className="pt-2 border-t text-xs md:text-sm text-muted-foreground">
                      <p>{t('businessHours.note1')}</p>
                      <p>{t('businessHours.note2')}</p>
                      <p>{t('businessHours.note3')}</p>
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
