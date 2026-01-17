# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. Initially planned to just be a project to improve App Router knowledge, but started to like the direction it went and decided to ship it fully. UI is not optimized for Desktop devices, since the app should be used mainly inside the gym on the mobile/tablet.**

**_If you are interested in checking functionality or design, please inspect in mobile mode._**

Since I am also interested in mobile dev, I might even make a proper app using React Native instead of Next.js PWA. Going deeper and making the web app more complex has exposed quite a few shortcomings of PWAs.

## Steps until v1:

- Priority: 

ExerciseDrawer - _Add carousel-like UI to show current sets inside ExerciseForm for easy reps and weight editing and quick delete. Add small purpose indicator next to the each set's label and delete button. Find a way to have different trigger button for add and edit form. Implemet the same form on edit workout page. Add delete name/ttile button for both workout and exercise form._

- _Make reusable setCounter component for both exerciseList and setSection which should hold the logic for total working sets per exercise/workout, add counter next to the set and exercise label for the total amount, make exerciseCounter component for previewWorkoutDrawer, fix the error inside last updated exercise component. See if create and edit workout form could be one._

WorkoutToDoPage - _UI overhaul. Remodel adding exercise set and adding new exercise on workout to do page to reflect the new adding set design. removeNote button same design as in create workout form._

PostWorkoutPage - _Create LatestCompletedExerciseIteration and render it inside ExerciseDrawer for easier, without leaving drawer editing. Should be replacement for whole workout approach with PreviewWorkoutDrawer. Better rendering of animation and extract variants._

- _Finish logs page UI - add option to query by date using calendar drawer, pagination and pagination preferance 6,8,10,12,16,20. Add logs tooltip. Add option to select more workouts and delete them all at once on current, archived and logs pages._

- _Finish profile page UI - add option for user to set their own pfp instead of the initials, add separate route for settings and make settings button inside ProfileButtonModal lead to it. See if possible to close swipe when swiping other sets or pressing anywhere else._

- _Add email verification and option to get email from profile page, password reset option, option to delete profile with cascading, uploading profile picture. Add gradient on landing page and make small svg "note your sets". Add option in user preference for padding bottom on navbars._

- _Upgrade to tailwind v4 when ready. Persist form data from workout to do page inside local storage as backup when app crashes while doing a workout. Later on add cron job that removes all workouts older than 1 year if storage becomes the problem._
