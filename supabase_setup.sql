-- ===============================================
-- 주간지 기능을 위한 Supabase 설정 SQL
-- ===============================================

-- ⚠️ 중요: 이 SQL을 실행하기 전에 반드시 스토리지 버킷을 먼저 생성해야 합니다!
-- 
-- 📋 설정 순서:
-- 1. Supabase 대시보드 → Storage → Create bucket
-- 2. 'newsletters' 버킷 생성 (공개 버킷으로 설정)
-- 3. 'newsletter-covers' 버킷 생성 (공개 버킷으로 설정)
-- 4. 이 SQL 스크립트 실행
-- 5. 웹 애플리케이션에서 '설정 확인' 버튼 클릭하여 검증

-- ===============================================
-- 1. 주간지 테이블 생성
-- ===============================================

-- 주간지 테이블 생성
CREATE TABLE newsletters (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  language VARCHAR(2) NOT NULL CHECK (language IN ('ko', 'en')),
  published_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 업데이트 트리거 함수 생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 추가
CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON newsletters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 인덱스 추가
CREATE INDEX idx_newsletters_language ON newsletters(language);
CREATE INDEX idx_newsletters_published_date ON newsletters(published_date DESC);
CREATE INDEX idx_newsletters_is_active ON newsletters(is_active);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE newsletters ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 활성화된 뉴스레터를 볼 수 있도록 허용
CREATE POLICY "Allow public read access to active newsletters" ON newsletters
  FOR SELECT USING (is_active = true);

-- 인증된 사용자만 모든 뉴스레터를 볼 수 있도록 허용 (관리자용)
CREATE POLICY "Allow authenticated users to read all newsletters" ON newsletters
  FOR SELECT USING (auth.role() = 'authenticated');

-- 인증된 사용자만 뉴스레터를 생성, 수정, 삭제할 수 있도록 허용
CREATE POLICY "Allow authenticated users to manage newsletters" ON newsletters
  FOR ALL USING (auth.role() = 'authenticated');

-- ===============================================
-- 2. 스토리지 정책 (버킷 생성 후 실행)
-- ===============================================

-- newsletters 버킷 정책
CREATE POLICY "Allow public read access to newsletters bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'newsletters');

CREATE POLICY "Allow authenticated users to upload newsletters" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'newsletters' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete newsletters" ON storage.objects
  FOR DELETE USING (bucket_id = 'newsletters' AND auth.role() = 'authenticated');

-- newsletter-covers 버킷 정책
CREATE POLICY "Allow public read access to newsletter-covers bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'newsletter-covers');

CREATE POLICY "Allow authenticated users to upload covers" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'newsletter-covers' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete covers" ON storage.objects
  FOR DELETE USING (bucket_id = 'newsletter-covers' AND auth.role() = 'authenticated');

-- ===============================================
-- 3. 샘플 데이터 (선택사항)
-- ===============================================

-- 샘플 데이터 (선택사항)
INSERT INTO newsletters (title, description, language, published_date, file_url, cover_image_url) VALUES
('2024년 1월호 노동법 주간지', '신년 특집: 2024년 노동법 주요 변경사항', 'ko', '2024-01-01', '/sample-ko-jan.pdf', '/sample-cover-ko-jan.jpg'),
('January 2024 Labor Law Weekly', 'New Year Special: Major Changes in Labor Law 2024', 'en', '2024-01-01', '/sample-en-jan.pdf', '/sample-cover-en-jan.jpg'); 