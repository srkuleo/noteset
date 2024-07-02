CREATE INDEX IF NOT EXISTS "username_index" ON "users" USING btree ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "users" USING btree ("email");