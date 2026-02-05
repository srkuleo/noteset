ALTER TABLE "workouts" ALTER COLUMN "exercises" SET DATA TYPE jsonb;

UPDATE "workouts"
SET "exercises" = (
  SELECT jsonb_agg(
    (ex - 'lastUpdated' - 'movementType') ||
    jsonb_build_object(
      'lastUpdateTimestamp',
      (EXTRACT(EPOCH FROM (ex->>'lastUpdated')::timestamptz) * 1000)::bigint,
      'limbInvolvement',
      ex->'movementType',
      'note',
      COALESCE(ex->>'note', ''),
      'sets',
      (
        SELECT jsonb_agg(
          (s - 'warmup') ||
          jsonb_build_object(
            'purpose',
            CASE
              WHEN s ? 'warmup' AND (s->>'warmup')::boolean = true THEN 'warmup'
              WHEN s ? 'warmup' AND (s->>'warmup')::boolean = false THEN 'working'
              ELSE 'none'
            END
          )
        )
        FROM jsonb_array_elements(ex->'sets') AS s
      )
    )
  )
  FROM jsonb_array_elements("workouts"."exercises") AS ex
);