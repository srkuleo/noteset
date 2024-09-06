ALTER TABLE "users" ALTER COLUMN "preferences" DROP NOT NULL;--> statement-breakpoint

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";--> statement-breakpoint

-- Begin the migration to update exercises structure
DO $$ 
DECLARE
    workout RECORD;
    exercise JSONB;
    new_exercises JSONB;
    i INT;
BEGIN
    -- Iterate over all workouts
    FOR workout IN SELECT * FROM workouts LOOP
        new_exercises := '[]'::jsonb;

        -- Iterate over each exercise in the workout
        FOR i IN 0 .. jsonb_array_length(workout.exercises::jsonb) - 1 LOOP
            exercise := workout.exercises->i;

            -- Handle the old schema where 'sets' is a number
            IF (exercise->>'sets') ~ '^\d+$' THEN
                -- Transform the old sets, reps, and weights into the new sets format
                new_exercises := new_exercises || jsonb_build_object(
                    'id', exercise->>'id',
                    'name', exercise->>'name',
                    'sets', (
                        SELECT jsonb_agg(jsonb_build_object(
                            'id', uuid_generate_v4(),
                            'reps', reps.value,
                            'weight', weights.value
                        ))
                        FROM jsonb_array_elements(exercise->'reps') WITH ORDINALITY reps(value, idx)
                        JOIN jsonb_array_elements(exercise->'weights') WITH ORDINALITY weights(value, idx)
                        ON reps.idx = weights.idx
                    ),
                    'note', exercise->>'note'
                );
            ELSE
                -- In case 'sets' is already an array, leave it as is
                new_exercises := new_exercises || exercise;
            END IF;
        END LOOP;

        -- Update the workout with the transformed exercises
        UPDATE workouts
        SET exercises = new_exercises
        WHERE id = workout.id;
    END LOOP;
END $$;