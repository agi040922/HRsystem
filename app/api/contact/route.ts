import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"

export const runtime = "nodejs"

const CONTACT_TO_EMAIL = "fairhr@nate.com"
const DEFAULT_FROM = "FAIR 상담문의 <noreply@email.solhun.com>"
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
})

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function buildContactEmailHtml(values: z.infer<typeof contactFormSchema>) {
  const rows = [
    ["회사명", values.companyName],
    ["성함", values.name],
    ["연락처", values.contact],
    ["이메일", values.email],
  ]

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111827;">
      <h1 style="font-size:20px;margin:0 0 20px;">FAIR 상담 신청</h1>
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
      <h2 style="font-size:16px;margin:0 0 8px;">요청 내용</h2>
      <div style="white-space:pre-wrap;line-height:1.6;border:1px solid #E5E7EB;border-radius:8px;padding:16px;background:#FFFFFF;">${escapeHtml(values.message)}</div>
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

    return NextResponse.json({ message: "문의가 성공적으로 접수되었습니다.", id: data?.id }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "입력값을 확인해주세요." }, { status: 400 })
    }

    console.error("[contact] Failed to process contact form:", error)
    return NextResponse.json({ message: "문의 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
