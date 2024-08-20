ALTER TABLE "users" ADD COLUMN "preferences" json;--> statement-breakpoint
UPDATE "users"
SET "preferences" = jsonb_set(COALESCE("preferences"::jsonb, '{}'::jsonb), '{timeFormat}', '"default"'::jsonb)
WHERE "preferences" IS NULL OR "preferences"->>'timeFormat' IS NULL;