-- =====================================================
-- 物件テーブル作成
-- =====================================================
CREATE TABLE IF NOT EXISTS properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,              -- 物件名
  rent        INTEGER     NOT NULL,              -- 家賃（円）
  area        TEXT        NOT NULL,              -- エリア名
  floor_plan  TEXT        NOT NULL,              -- 間取り（例：1LDK）
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- 登録ユーザー
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Row Level Security（RLS）を有効化
-- =====================================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 既存ポリシーを削除してから再作成（冪等性を確保）
DROP POLICY IF EXISTS "自分の物件を参照" ON properties;
DROP POLICY IF EXISTS "自分の物件を登録" ON properties;
DROP POLICY IF EXISTS "自分の物件を更新" ON properties;
DROP POLICY IF EXISTS "自分の物件を削除" ON properties;

-- 自分が登録した物件のみ参照可能
CREATE POLICY "自分の物件を参照" ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- 自分のuser_idでのみ新規登録可能
CREATE POLICY "自分の物件を登録" ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 自分が登録した物件のみ更新可能
CREATE POLICY "自分の物件を更新" ON properties
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 自分が登録した物件のみ削除可能
CREATE POLICY "自分の物件を削除" ON properties
  FOR DELETE
  USING (auth.uid() = user_id);
