# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. Initially planned to just be a project to improve App Router knowledge, but started to like the direction it went and decided to ship it fully. UI is not optimized for Desktop devices, since the app should be used mainly inside the gym on the mobile/tablet.**

**_If you are interested in checking functionality or design, please inspect in mobile mode._**

Since I am also interested in mobile dev, I might even make a proper app using React Native instead of Next.js PWA. Going deeper and making the web app more complex has exposed quite a few shortcomings of PWAs.

## Steps until v1:

- _Finish logs page UI - add option to query by date using calendar drawer, pagination and pagination preferance 6,8,10,12,16,20. Finish profile page UI - add option for user to set their own pfp instead of the initials, add separate route for settings and make settings button inside ProfileButtonModal lead to it. See if possible to close swipe when swiping other sets or pressing anywhere else._

- _Add email verification and option to get email from profile page, password reset option, option to delete profile with cascading, uploading profile picture. Add gradient on landing page and make small svg "note your sets". Add option in user preference for padding bottom on navbars._

- _Upgrade to tailwind v4 when ready and fix eslint error, see if thhere is a better way to switch between current and archived workouts._
