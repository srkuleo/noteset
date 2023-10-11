# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. UI not optimize for a Desktop, only check on mobile or Inspect it with a mobile resolution.**

Making this app with an idea to use it in the gym instead of a notebook. Still WIP, plan to finish it soon.

## Future updates and plans:

- _Set up next auth and mock profile in db to compare auth to, figure out data model for db. Change route name from "profile" to dynamic route containing user's username. Make nested routes inside dynamic route folder, with options to go to profile page and workout logs page._
- _Set up form actions and db mutation with server actions._
- _Figure out how to set clicked button in navbar to different color, would state be preserved between different routes._

- _Make new add and edit modal forms using radix ui and server actions for adding a new workout and editing existing one. Add warning modal for removing workout and confirming one before pushing a new or edited workout to db. Add toast notifications using sonner._
- _Set a limit on description input field to no longer than 85ch._

- _Figure out a way to swipe card with touch._
- _Make start button a link component that leads to new page with workout details._
- _Add an active workout page, with proper structure based on database model._
