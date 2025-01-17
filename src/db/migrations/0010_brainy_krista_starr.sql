ALTER TABLE "sessions" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint

UPDATE "users"
SET "preferences" = jsonb_set(
  "preferences"::jsonb,
  '{logsOrder}',
  '"default"'::jsonb
)
WHERE "preferences"->>'logsOrder' IS NULL;