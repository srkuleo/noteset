# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. Initially planned to just be a project to improve App Router knowledge, but started to like the direction it went and decided to ship it fully. UI is not optimized for Desktop devices, since the app should be used mainly inside the gym on the mobile/tablet.**

**_If you are interested in checking functionality or design, please inspect in mobile mode._**

Since I am also interested in mobile dev, I might even make a proper app using React Native instead of Next.js PWA. Going deeper and making the web app more complex has exposed quite a few shortcomings of PWAs.

### Steps until v1:

- WorkoutToDoPage - _UI overhaul. Remodel adding exercise set and adding new exercise on workout to do page to reflect the new adding set design. Add targetedSet and nextSessionSet option for easier tracking, no longer need to note every set for the future reference._

- Logs page UI/UX - _Add option to query by date using calendar drawer, pagination and pagination preferance 6,8,10,12,16,20. Add logs tooltip. Add option to select more workouts and delete them all at once on current, archived and logs pages._

- Profile page UI - _Add option for user to set their own pfp instead of the initials, add separate route for settings and make settings button inside ProfileButtonModal lead to it._

- _Add email verification and option to get email from profile page, password reset option, option to delete profile with cascading, uploading profile picture, rate limiting._

---

### Future

- _Upgrade to tailwind v4 when ready._ 

- _Persist form data from workout to do page inside local storage as backup when app crashes while doing a workout. Later on add cron job that removes all workouts older than 1 year if storage becomes the problem. Implement diet page._
