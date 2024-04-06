CREATE TABLE IF NOT EXISTS "workouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(30) NOT NULL,
	"description" varchar(80),
	"exercises" json NOT NULL,
	"status" varchar(10) DEFAULT 'current',
	"user_id" varchar(255) NOT NULL,
	"done_at" timestamp DEFAULT now(),
	"time_elapsed" varchar(100)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "workouts" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_index" ON "workouts" ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "status_index" ON "workouts" ("status");