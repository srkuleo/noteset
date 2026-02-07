ALTER TABLE "users" ALTER COLUMN "preferences" SET DATA TYPE jsonb;

UPDATE "workouts"
SET "exercises" = (
  SELECT jsonb_agg(
    CASE
      WHEN
        NOT (ex ? 'sets')
        OR jsonb_typeof(ex->'sets') = 'null'
        OR NOT (ex ? 'lastUpdateTimestamp')
        OR jsonb_typeof(ex->'lastUpdateTimestamp') = 'null'
        OR jsonb_typeof(ex->'limbInvolvement') = 'null'
      THEN
        ex
        || jsonb_build_object(
          'sets',
          CASE
            WHEN NOT (ex ? 'sets')
              OR jsonb_typeof(ex->'sets') = 'null'
            THEN '[]'::jsonb
            ELSE ex->'sets'
          END,
          'lastUpdateTimestamp',
          CASE
            WHEN NOT (ex ? 'lastUpdateTimestamp')
              OR jsonb_typeof(ex->'lastUpdateTimestamp') = 'null'
            THEN to_jsonb((EXTRACT(EPOCH FROM NOW()) * 1000)::bigint)
            ELSE ex->'lastUpdateTimestamp'
          END,
          'limbInvolvement',
          CASE
            WHEN jsonb_typeof(ex->'limbInvolvement') = 'null'
            THEN to_jsonb('bilateral'::text)
            ELSE ex->'limbInvolvement'
          END
        )
      ELSE
        ex
    END
  )
  FROM jsonb_array_elements("workouts"."exercises") AS ex
);