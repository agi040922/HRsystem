import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"

export const runtime = "nodejs"

const QNA_TO_EMAIL = "fairhr@nate.com"
const DEFAULT_FROM = "FAIR Q&A <noreply@email.solhun.com>"

const qnaSchema = z
  .object({
    name: z.string().min(2),
    contact: z.string().regex(/^01[016789]-\d{3,4}-\d{4}$/),
    email: z.string().email(),
    title: z.string().min(5),
    content: z.string().min(10),
    isPrivate: z.boolean().optional().default(false),
    password: z.string().optional(),
  })
  .refine((data) => !data.isPrivate || (data.password && data.password.length >= 4), {
    path: ["password"],
  })

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function buildQnaEmailHtml(values: z.infer<typeof qnaSchema>) {
  const rows = [
    ["이름", values.name],
    ["연락처", values.contact],
    ["이메일", values.email],
    ["비밀글 여부", values.isPrivate ? "예" : "아니오"],
  ]

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#111827;">
      <h1 style="font-size:20px;margin:0 0 20px;">FAIR Q&A 문의</h1>
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
      <h2 style="font-size:16px;margin:0 0 8px;">${escapeHtml(values.title)}</h2>
      <div style="white-space:pre-wrap;line-height:1.6;border:1px solid #E5E7EB;border-radius:8px;padding:16px;background:#FFFFFF;">${escapeHtml(values.content)}</div>
      ${
        values.isPrivate
          ? '<p style="font-size:12px;color:#6B7280;margin-top:16px;">비밀글 비밀번호는 보안상 이메일에 포함하지 않았습니다.</p>'
          : ''
      }
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ message: "이메일 발송 설정이 누락되었습니다." }, { status: 500 })
    }

    const values = qnaSchema.parse(await request.json())
    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || DEFAULT_FROM,
      to: [QNA_TO_EMAIL],
      replyTo: values.email,
      subject: `[FAIR Q&A] ${values.title}`,
      html: buildQnaEmailHtml(values),
    })

    if (error) {
      console.error("[qna] Resend error:", error)
      return NextResponse.json({ message: "이메일 발송에 실패했습니다." }, { status: 502 })
    }

    return NextResponse.json({ message: "문의가 성공적으로 등록되었습니다.", id: data?.id }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "입력값을 확인해주세요." }, { status: 400 })
    }

    console.error("[qna] Failed to process inquiry:", error)
    return NextResponse.json({ message: "문의 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
