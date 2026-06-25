-- ===============================================
-- 뉴스레터 게시판 추가 마이그레이션
-- 공지사항(board_posts)을 카테고리로 구분하여
-- 공지사항 / 뉴스레터 두 게시판으로 분리합니다.
-- ===============================================
--
-- 📋 실행 방법:
-- 1. Supabase 대시보드 → 해당 프로젝트(fairhr.net 운영 DB) 접속
-- 2. 좌측 메뉴 → SQL Editor → New query
-- 3. 아래 SQL 전체를 복사해 붙여넣고 [Run] 클릭
--
-- ⚠️ 안전성: 기존 글에는 자동으로 'notice'(공지사항)가 채워지므로
--    기존 공지사항 게시판은 그대로 유지됩니다. (데이터 손실 없음)
-- ===============================================

-- board_posts 테이블에 category 컬럼 추가 (기본값: notice = 공지사항)
ALTER TABLE board_posts
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'notice';

-- 허용 값 제약: 공지사항(notice) 또는 뉴스레터(newsletter)만 허용
ALTER TABLE board_posts
  DROP CONSTRAINT IF EXISTS board_posts_category_check;
ALTER TABLE board_posts
  ADD CONSTRAINT board_posts_category_check
  CHECK (category IN ('notice', 'newsletter'));

-- 카테고리별 조회 성능을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_board_posts_category ON board_posts(category);

-- (참고) 기존 글 중 일부를 뉴스레터로 옮기고 싶다면, 어드민에서 글 수정 →
-- '게시판' 항목을 '뉴스레터'로 바꾸면 됩니다. SQL로 일괄 변경하려면 예시:
--   UPDATE board_posts SET category = 'newsletter' WHERE id IN (1, 2, 3);
