import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const contact = formData.get("contact") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const attachment = formData.get("attachment") as File | null

    // 여기에 이메일 발송 로직 또는 데이터베이스 저장 로직을 구현합니다.
    // 예: Nodemailer, SendGrid 등을 사용한 이메일 발송
    // 예: 데이터베이스에 문의 내용 저장

    console.log("Received contact form data:")
    console.log("Name:", name)
    console.log("Contact:", contact)
    console.log("Email:", email)
    console.log("Subject:", subject)
    console.log("Message:", message)
    if (attachment) {
      console.log("Attachment Name:", attachment.name)
      console.log("Attachment Size:", attachment.size)
      console.log("Attachment Type:", attachment.type)
      // 첨부파일 처리 로직 (예: 클라우드 스토리지에 업로드)
    }

    // 성공 응답
    return NextResponse.json({ message: "문의가 성공적으로 접수되었습니다." }, { status: 200 })
  } catch (error) {
    console.error("문의 처리 중 오류 발생:", error)
    return NextResponse.json({ message: "문의 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
