ALTER TABLE "workouts" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint

UPDATE "workouts"
SET "exercises" = (
    SELECT jsonb_agg(
        jsonb_set(
            exercise,
            '{lastUpdated}',
            'null'::jsonb
        )
    )
    FROM jsonb_array_elements("exercises"::jsonb) AS exercise
)
WHERE "status" = 'current';