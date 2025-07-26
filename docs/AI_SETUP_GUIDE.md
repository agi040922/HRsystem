# AI 기능 설정 가이드

이 가이드는 노동법률사무소 웹사이트의 AI 기반 기능들을 설정하는 방법을 설명합니다.

## 1. 게시글 AI 생성 기능

### API 설정
- `/api/ai/generate-post` 엔드포인트가 구현되어 있습니다
- OpenAI API 키가 환경변수에 설정되어 있어야 합니다

### 기능
- 제목과 내용을 입력하면 AI가 HTML 형식의 전문적인 게시글 생성
- SEO 메타데이터 자동 생성
- URL 슬러그 자동 생성

## 2. 이미지 업로드 기능

### Supabase Storage 설정

#### 2.1 board-images 버킷 생성

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard 에서 프로젝트 선택

2. **Storage 탭으로 이동**
   - 왼쪽 메뉴에서 "Storage" 클릭

3. **새 버킷 생성**
   - "Create bucket" 버튼 클릭
   - Bucket name: `board-images`
   - Public bucket: ✅ 체크 (공개 접근 허용)
   - "Save" 클릭

4. **버킷 정책 설정** (중요!)
   ```sql
   -- board-images 버킷에 대한 공개 접근 정책
   -- Storage > Policies 탭에서 다음 정책들을 추가:

   -- 1. 공개 읽기 정책
   CREATE POLICY "Public read access for board images" ON storage.objects 
   FOR SELECT 
   USING (bucket_id = 'board-images');

   -- 2. 인증된 사용자 업로드 정책 (관리자용)
   CREATE POLICY "Allow authenticated users to upload board images" ON storage.objects 
   FOR INSERT 
   WITH CHECK (bucket_id = 'board-images' AND auth.role() = 'authenticated');

   -- 3. 인증된 사용자 삭제 정책 (관리자용)
   CREATE POLICY "Allow authenticated users to delete board images" ON storage.objects 
   FOR DELETE 
   USING (bucket_id = 'board-images' AND auth.role() = 'authenticated');
   ```

#### 2.2 기존 Newsletter 버킷들도 확인

이미 newsletter 기능에서 다음 버킷들이 생성되어 있어야 합니다:
- `newsletters` (PDF 파일용)
- `newsletter-covers` (표지 이미지용)

### 기능

#### 게시글 작성 시 이미지 업로드
- `/admin/board/create` - 새 게시글 작성 시
- `/admin/board/edit/[id]` - 기존 게시글 수정 시

#### 지원 기능
- 다중 이미지 업로드 (한 번에 여러 개)
- 실시간 업로드 진행률
- 이미지 미리보기
- URL 복사 기능
- 에디터에 자동 삽입 기능
- 파일 크기 제한: 10MB
- 지원 형식: JPG, PNG, WebP, GIF

#### 사용법
1. "이미지 업로드" 섹션에서 파일 선택
2. 업로드 완료 후 "관리하기" 버튼 클릭
3. 각 이미지별로:
   - 📋 URL 복사
   - ✏️ 에디터에 삽입
   - ❌ 삭제

### 설정 확인
관리자 패널에서 "설정 확인" 버튼을 클릭하여 버킷이 올바르게 설정되었는지 확인할 수 있습니다.

## 3. 문제 해결

### 버킷 접근 오류
- Supabase 대시보드에서 버킷이 생성되었는지 확인
- 버킷이 public으로 설정되었는지 확인
- RLS 정책이 올바르게 설정되었는지 확인

### 업로드 실패
- 파일 크기가 10MB 이하인지 확인
- 지원되는 이미지 형식인지 확인
- 네트워크 연결 상태 확인

### 이미지가 표시되지 않음
- 업로드된 이미지의 공개 URL이 올바른지 확인
- 브라우저 캐시 새로고침
- Supabase 버킷의 public 설정 확인

## 4. 보안 고려사항

- 업로드는 관리자만 가능 (인증된 사용자)
- 파일 크기 제한으로 과도한 업로드 방지
- 지원하지 않는 파일 형식 차단
- 파일명 자동 안전화 처리 