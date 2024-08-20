# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. Initially planned to just be a project to improve App Router knowledge, but started to like the direction it went and decided to ship it fully. UI is not optimized for Desktop devices, since the app should be used mainly inside the gym on the mobile/tablet.**

**_If you are interested in checking functionality or design, please inspect in mobile mode._**

Since I am also interested in mobile dev, I might even make a proper app using React Native instead of Next.js PWA. Going deeper and making the webapp more complex has exposed quite a few shortcomings of PWA.

## Future updates and plans:

- _Extract logic for both timer and handling workout in 2 separate custom hooks. Validate input inside handleNoteInput (max 80 char, show indicator), render errors for reps, weights and note. Find a way to remove added set. Implement not doing today bolean checkbutton on exercises you wont be doing that day. See if there is a way to subscribe to users touch actions on mobile._

- _Make post workout page with proper UI structure and way to modify current default workout if needed._

- _Finish profile and logs page UI - add search and filter option to display workouts with status: done or archived._

- _Add email verification and password reset option, option to delete profile with cascading, uploading profile picture. Add gradient on landing page and make small svg "note your sets"._
