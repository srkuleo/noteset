# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. Initially planned to just be a project to improve App Router knowledge, but started to like the direction it went and decided to ship it fully. UI is not optimized for Desktop devices, since the app should be used mainly inside the gym on the mobile/tablet.**

**_If you are interested in checking functionality or design, please inspect in mobile mode._**

Since I am also interested in mobile dev, I might even make a proper app using React Native instead of Next.js PWA. Going deeper and making the webapp more complex has exposed quite a few shortcomings of PWA.

## Future updates and plans:

- _Extract logic for both timer and handling workout in 2 separate custom hooks. Validate input inside handleNoteInput (max 80 char, show indicator), render errors for reps, weights and note, add zod schema to filter out empty strings in reps and weights before submitting. If possible remove conditional render on reps and weights in preview modal._

- _Refactor dnd and add simple animations with autoanimate to reps and weight on workout to do page, exercises inside edit, creat and post workout page, workouts on home page. Add animation to delete sets buttons and note input._

- _Finish logs page UI - add search and filter option to display workouts with status: done or archived._

- _Complete profile UI, add email verification and option to get email from profile page, password reset option, option to delete profile with cascading, uploading profile picture. Add gradient on landing page and make small svg "note your sets". Add option in user preference for padding bottom on navbars._
