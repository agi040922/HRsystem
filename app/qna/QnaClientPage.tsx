"use client" // Q&A 페이지는 클라이언트 컴포넌트로 시작 (폼, 아코디언 등 인터랙션)

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { HelpCircle, Send } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

const faqData = [
  {
    question: "노무 상담 비용은 어떻게 되나요?",
    answer:
      "상담 유형 및 시간에 따라 비용이 다릅니다. 기본 상담료는 [금액]이며, 자세한 내용은 전화 또는 온라인 문의 바랍니다.",
  },
  {
    question: "온라인 상담 신청 후 답변은 언제 받을 수 있나요?",
    answer:
      "일반적으로 영업일 기준 24~48시간 이내에 답변 드립니다. 사안의 복잡성에 따라 다소 시간이 소요될 수 있습니다.",
  },
  {
    question: "방문 상담도 가능한가요?",
    answer: "네, 가능합니다. 사전에 전화 또는 온라인으로 예약해주시면 원활한 상담이 가능합니다.",
  },
  {
    question: "개인정보는 안전하게 관리되나요?",
    answer: "네, 고객님의 개인정보는 개인정보처리방침에 따라 철저히 관리되며, 상담 내용은 비밀이 보장됩니다.",
  },
]

const qnaFormSchema = z
  .object({
    name: z.string().min(2, { message: "이름은 2자 이상 입력해주세요." }),
    contact: z
      .string()
      .regex(/^01[016789]-\d{3,4}-\d{4}$/, { message: "올바른 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)" }),
    email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요." }),
    title: z.string().min(5, { message: "제목은 5자 이상 입력해주세요." }),
    content: z.string().min(10, { message: "문의 내용은 10자 이상 입력해주세요." }),
    isPrivate: z.boolean().default(false),
    password: z.string().optional(),
  })
  .refine((data) => !data.isPrivate || (data.isPrivate && data.password && data.password.length >= 4), {
    message: "비밀글 설정 시 4자리 이상의 비밀번호를 입력해야 합니다.",
    path: ["password"],
  })

type QnaFormValues = z.infer<typeof qnaFormSchema>

export default function QnaClientPage() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QnaFormValues>({
    resolver: zodResolver(qnaFormSchema),
    defaultValues: {
      isPrivate: false,
    },
  })

  const isPrivateChecked = watch("isPrivate")

  const onSubmit: SubmitHandler<QnaFormValues> = async (data) => {
    // TODO: 실제 API 호출로 변경
    console.log("Q&A 제출 데이터:", data)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    toast({
      title: "문의 등록 성공",
      description: "문의사항이 성공적으로 등록되었습니다. 빠른 시일 내에 답변드리겠습니다.",
    })
    reset() // 폼 초기화
    setShowPassword(false)
  }

  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Q&A</h1>
        <p className="mt-4 text-lg text-muted-foreground">궁금한 점을 해결하고, 전문가의 답변을 받아보세요.</p>
      </div>

      <section id="faq" className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-7 h-7 text-primary" /> 자주 묻는 질문 (FAQ)
        </h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </section>

      <section id="qna-form">
        <h2 className="text-3xl font-semibold mb-8 text-center flex items-center justify-center gap-2">
          <Send className="w-7 h-7 text-primary" /> 직접 질문하기
        </h2>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto space-y-6 p-6 border rounded-lg bg-card shadow-lg" // shadow 추가
        >
          <div>
            <Label htmlFor="name">이름</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact">연락처 (휴대폰)</Label>
            <Input id="contact" placeholder="010-1234-5678" {...register("contact")} />
            {errors.contact && <p className="text-sm text-red-500 mt-1">{errors.contact.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="title">제목</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="content">문의 내용</Label>
            <Textarea id="content" rows={5} {...register("content")} />
            {errors.content && <p className="text-sm text-red-500 mt-1">{errors.content.message}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isPrivate"
              {...register("isPrivate")}
              onCheckedChange={(checked) => setShowPassword(!!checked)}
            />
            <Label
              htmlFor="isPrivate"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              비밀글로 등록하기
            </Label>
          </div>
          {isPrivateChecked && (
            <div>
              <Label htmlFor="password">비밀번호 (4자리 이상)</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} {...register("password")} />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "숨김" : "표시"}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "문의 등록"}
          </Button>
        </motion.form>
      </section>

      {/* 내 질문 확인 (로그인 기능 구현 시) */}
      {/* <section id="my-questions" className="mt-16">
      <h2 className="text-3xl font-semibold mb-8 text-center">내 질문 확인</h2>
      <p className="text-center text-muted-foreground">로그인 후 내가 등록한 질문과 답변 상태를 확인할 수 있습니다. (구현 예정)</p>
    </section> */}
    </div>
  )
}
