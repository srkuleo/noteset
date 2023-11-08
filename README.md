# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. UI not optimize for a Desktop, only check on mobile or Inspect it with a mobile resolution.**

Making this app with an idea to use it in a gym instead of a notebook. Still WIP, plan to ship it soon. In the future might change the logo and add a hero image or a bg design pattern.

## Future updates and plans:

- _Set up next auth and mock user profile in db to compare auth to, figure out data model for db. Change route name from "user" to dynamic route containing user's username. Construct user's homepage based on db workouts schema._

- _Add edit button and conditionally rendered start button when workout is selected._

- _Make add and edit modal forms using radix ui and server actions for adding a new workout and editing existing one. Add warning modal for removing workout and confirming one before pushing a new or edited workout to db. Add toast notifications using sonner._
- _Set a limit on description input field to no longer than 85ch using zod._

- _Make start button a link component that leads to new page with workout details._
- _Add an active workout page, with proper structure based on database model._

- _Modify profile and logs page to have an actual content._
