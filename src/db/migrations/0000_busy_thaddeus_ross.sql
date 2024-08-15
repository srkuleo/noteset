DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('current', 'done', 'arhived');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" varchar(32) NOT NULL,
	"email" varchar(255) NOT NULL,
	"hashed_password" varchar(100) NOT NULL,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(30) NOT NULL,
	"description" varchar(80) NOT NULL,
	"exercises" json NOT NULL,
	"status" "status" DEFAULT 'current',
	"user_id" varchar(255) NOT NULL,
	"done_at" date,
	"time_elapsed" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "username_index" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "workouts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_index" ON "workouts" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "status_index" ON "workouts" USING btree ("status");