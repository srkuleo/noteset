ALTER TABLE "users" ALTER COLUMN "is_verified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "preferences" SET NOT NULL;