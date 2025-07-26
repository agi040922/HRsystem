import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    const prompt = `다음 게시글 정보를 분석해서 웹사이트용 메타데이터를 생성해주세요.

제목: ${title}
내용: ${content}

아래 JSON 형식으로만 응답해주세요. 마크다운이나 다른 텍스트는 절대 포함하지 마세요:

{
  "htmlContent": "HTML로 변환된 내용 (원본 텍스트의 문단 구분을 정확히 반영)",
  "slug": "URL에 사용될 영문 슬러그 (소문자, 하이픈 사용)",
  "excerpt": "150자 이내의 요약문",
  "metaTitle": "SEO용 제목 (30자 이내)",
  "metaDescription": "SEO용 설명 (100자 이내)",
  "suggestedFeaturedImage": "이 글에 어울리는 이미지에 대한 설명"
}

HTML 변환 규칙 (매우 중요):
1. 원본 텍스트에서 빈 줄(엔터 두 번)로 구분된 부분은 각각 별도의 <p></p> 태그로 변환
2. 사용자가 문단을 나눈 의도를 정확히 반영하여 HTML에서도 동일하게 문단 분리
3. 하나의 문단 내에서는 줄바꿈이 있어도 같은 <p> 태그 안에 유지
4. 제목이나 소제목이 있으면 <h3></h3> 태그 사용
5. 목록 형태가 있으면 <ul><li></li></ul> 또는 <ol><li></li></ol> 태그 사용
6. 강조할 부분은 <strong></strong> 또는 <em></em> 태그 사용
7. <br> 태그는 사용하지 말고 문단 분리는 <p> 태그로만 처리

예시:
원본 텍스트가 "첫 번째 문단입니다.

두 번째 문단입니다.

세 번째 문단입니다."라면

HTML 결과: "<p>첫 번째 문단입니다.</p><p>두 번째 문단입니다.</p><p>세 번째 문단입니다.</p>"

기타 규칙:
1. 슬러그는 영문으로, 제목의 핵심 키워드를 포함
2. 요약문은 핵심 내용을 간결하게 정리
3. SEO 제목과 설명은 검색에 최적화
4. 모든 텍스트는 한국어로 작성 (슬러그 제외)
5. 법무법인 공지사항의 성격에 맞게 전문적이고 신뢰성 있는 톤으로 작성

중요: 반드시 순수 JSON 형식으로만 응답하세요. 코드블록 마크다운은 절대 사용하지 마세요.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "당신은 법무법인 웹사이트의 컨텐츠 전문가입니다. 원본 텍스트의 문단 구분(빈 줄로 나뉜 부분)을 정확히 파악하여 HTML의 <p> 태그로 그대로 반영해주세요. 사용자가 의도한 문단 구분을 절대 임의로 변경하지 마세요. 반드시 순수 JSON 형식으로만 응답하고, 마크다운 코드블록이나 추가 설명은 절대 포함하지 마세요."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    let result = completion.choices[0]?.message?.content
    if (!result) {
      throw new Error('AI 응답을 받을 수 없습니다.')
    }

    // 마크다운 코드블록 제거 (혹시 AI가 포함했을 경우를 대비)
    result = result.trim()
    if (result.startsWith('```json')) {
      result = result.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (result.startsWith('```')) {
      result = result.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    try {
      const generatedData = JSON.parse(result)
      
      // 생성된 데이터 검증
      if (!generatedData.htmlContent || !generatedData.slug || !generatedData.excerpt) {
        throw new Error('필수 필드가 누락되었습니다.')
      }

      return NextResponse.json({
        success: true,
        data: generatedData
      })
    } catch (parseError) {
      console.error('JSON 파싱 에러:', parseError)
      console.error('AI 응답 내용:', result)
      return NextResponse.json(
        { error: 'AI 응답 형식이 올바르지 않습니다. 다시 시도해주세요.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('AI 생성 에러:', error)
    return NextResponse.json(
      { error: '컨텐츠 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 