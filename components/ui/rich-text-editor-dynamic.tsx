"use client"

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

// 클라이언트 사이드에서만 로드되는 Rich Text Editor
const RichTextEditor = dynamic(() => import('./rich-text-editor'), {
  ssr: false,
  loading: () => (
    <div className="border rounded-lg min-h-[300px] flex items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        에디터를 불러오는 중...
      </div>
    </div>
  )
})

export default function RichTextEditorDynamic(props: RichTextEditorProps) {
  return <RichTextEditor {...props} />
}