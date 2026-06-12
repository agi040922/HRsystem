import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"

export const runtime = "nodejs"

// 수신자는 환경변수로 제어 (테스트 시 CONTACT_TO_EMAIL만 바꾸면 됨)
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "fairhr@nate.com"
const DEFAULT_FROM = "FAIR 상담문의 <noreply@email.solhun.com>"

const EMPLOYEE_COUNT_LABELS: Record<string, string> = {
  under10: "10인 미만",
  "10to50": "10~50인",
  "50to100": "50~100인",
  "100to300": "100~300인",
  over300: "300인 이상",
}

const SERVICE_LABELS: Record<string, string> = {
  advisory: "노무 자문 / FAIR CRM",
  diagnosis: "인사노무 진단",
  safety: "산업안전보건관리",
  payroll: "급여 아웃소싱 / 4대보험",
  dispute: "노동위원회 / 분쟁 대응",
  harassment: "직장 내 괴롭힘",
  other: "기타",
}
const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

const contactFormSchema = z.object({
  companyName: z.string().min(2),
  name: z.string().min(2),
  contact: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/),
  email: z.string().email(),
  message: z.string().min(10),
  // 표시용 필드라 검증 실패로 접수 자체가 막히지 않도록 느슨하게 받음
  employeeCount: z.string().optional(),
  interestedServices: z.string().optional(),
})

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function formatFieldLabels(values: z.infer<typeof contactFormSchema>) {
  const employeeCountLabel = values.employeeCount
    ? (EMPLOYEE_COUNT_LABELS[values.employeeCount] ?? values.employeeCount)
    : "-"
  // 폼에서 배열이 "advisory,diagnosis" 형태의 문자열로 넘어옴
  const serviceLabels = values.interestedServices
    ? values.interestedServices
        .split(",")
        .filter(Boolean)
        .map((key) => SERVICE_LABELS[key] ?? key)
        .join(", ")
    : "-"
  return { employeeCountLabel, serviceLabels }
}

function buildSummaryTableHtml(rows: string[][]) {
  return `
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tbody>
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <th style="width:120px;text-align:left;padding:10px;border:1px solid #E5E7EB;background:#F9FAFB;">${label}</th>
                <td style="padding:10px;border:1px solid #E5E7EB;">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </tbody>
    </table>
  `
}

function buildContactEmailHtml(values: z.infer<typeof contactFormSchema>) {
  const { employeeCountLabel, serviceLabels } = formatFieldLabels(values)

  const rows = [
    ["회사명", values.companyName],
    ["성함", values.name],
    ["연락처", values.contact],
    ["이메일", values.email],
    ["직원 규모", employeeCountLabel],
    ["관심 서비스", serviceLabels],
  ]

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111827;">
      <h1 style="font-size:20px;margin:0 0 20px;">FAIR 상담 신청</h1>
      ${buildSummaryTableHtml(rows)}
      <h2 style="font-size:16px;margin:0 0 8px;">요청 내용</h2>
      <div style="white-space:pre-wrap;line-height:1.6;border:1px solid #E5E7EB;border-radius:8px;padding:16px;background:#FFFFFF;">${escapeHtml(values.message)}</div>
    </div>
  `
}

/** 신청자에게 보내는 접수 확인 메일 */
function buildConfirmationEmailHtml(values: z.infer<typeof contactFormSchema>) {
  const { employeeCountLabel, serviceLabels } = formatFieldLabels(values)

  const rows = [
    ["회사명", values.companyName],
    ["성함", values.name],
    ["연락처", values.contact],
    ["직원 규모", employeeCountLabel],
    ["관심 서비스", serviceLabels],
  ]

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111827;">
      <h1 style="font-size:20px;margin:0 0 12px;">상담 신청이 접수되었습니다</h1>
      <p style="margin:0 0 20px;line-height:1.6;">
        ${escapeHtml(values.name)}님, 안녕하세요.<br/>
        FAIR 인사노무컨설팅에 상담을 신청해주셔서 감사합니다.<br/>
        접수된 내용을 검토 후 신속히 연락드리겠습니다.
      </p>
      <h2 style="font-size:16px;margin:0 0 8px;">신청 내용</h2>
      ${buildSummaryTableHtml(rows)}
      <h2 style="font-size:16px;margin:0 0 8px;">요청 내용</h2>
      <div style="white-space:pre-wrap;line-height:1.6;border:1px solid #E5E7EB;border-radius:8px;padding:16px;background:#FFFFFF;margin-bottom:24px;">${escapeHtml(values.message)}</div>
      <p style="margin:0 0 4px;font-size:14px;color:#4B5563;line-height:1.6;">
        급한 문의는 전화로 연락주세요: <a href="tel:02-387-9869" style="color:#2563EB;">02-387-9869</a><br/>
        (평일 10:00 ~ 20:00, 토요일 10:00 ~ 17:00)
      </p>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid #E5E7EB;font-size:12px;color:#9CA3AF;">
        FAIR 인사노무컨설팅 · 본 메일은 발신 전용입니다.
      </div>
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ message: "이메일 발송 설정이 누락되었습니다." }, { status: 500 })
    }

    const formData = await request.formData()
    const values = contactFormSchema.parse({
      companyName: formData.get("companyName"),
      name: formData.get("name"),
      contact: formData.get("contact"),
      email: formData.get("email"),
      message: formData.get("message"),
      employeeCount: formData.get("employeeCount") ?? undefined,
      interestedServices: formData.get("interestedServices") ?? undefined,
    })
    const attachment = formData.get("attachment")
    const attachments = []

    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > MAX_ATTACHMENT_SIZE) {
        return NextResponse.json({ message: "파일 크기는 5MB를 초과할 수 없습니다." }, { status: 400 })
      }
      if (!ALLOWED_ATTACHMENT_TYPES.has(attachment.type)) {
        return NextResponse.json({ message: "지원되지 않는 파일 형식입니다." }, { status: 400 })
      }
      attachments.push({
        filename: attachment.name,
        content: Buffer.from(await attachment.arrayBuffer()),
        contentType: attachment.type,
      })
    }

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || DEFAULT_FROM,
      to: [CONTACT_TO_EMAIL],
      replyTo: values.email,
      subject: `[FAIR 상담 신청] ${values.companyName} - ${values.name}`,
      html: buildContactEmailHtml(values),
      attachments,
    })

    if (error) {
      console.error("[contact] Resend error:", error)
      return NextResponse.json({ message: "이메일 발송에 실패했습니다." }, { status: 502 })
    }

    // 신청자 접수 확인 메일 — 실패해도 접수 자체는 성공이므로 로그만 남김
    try {
      const { error: confirmationError } = await resend.emails.send({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: [values.email],
        subject: "[FAIR] 상담 신청이 접수되었습니다",
        html: buildConfirmationEmailHtml(values),
      })
      if (confirmationError) {
        console.error("[contact] Confirmation email error:", confirmationError)
      }
    } catch (confirmationError) {
      console.error("[contact] Confirmation email error:", confirmationError)
    }

    return NextResponse.json({ message: "문의가 성공적으로 접수되었습니다.", id: data?.id }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "입력값을 확인해주세요." }, { status: 400 })
    }

    console.error("[contact] Failed to process contact form:", error)
    return NextResponse.json({ message: "문의 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
