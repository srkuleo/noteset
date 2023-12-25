# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. UI not optimize for a Desktop, only check on mobile or Inspect it with a mobile resolution.**

Making this app with an idea to use it in a gym instead of a notebook. Still WIP, plan to ship it soon. In the future might change the logo and add a hero image or a bg design pattern.

## Future updates and plans:

- _Add warning modal to confirm removing workout, preview modal to show preview of the workout, confirming modal to inform user before pushing a new or edited workout to db. Add confirmation page that renders if searchParam.successful is set to true and redirected to via server action, confirming that workout has been added or edited with revalidation and redirect to users homepage. Finish error page UI._

- _Change kinde schema and add status column to workouts table._

- _Figure out data model for db._

- _Finish UI and logic for create, edit and workout pages._

- _Set a limit on description field to 80-100ch and title field to 30ch using zod and db schema._

- _Modify profile and logs page to have an actual content._

- _Add error page if user doesn't provide givenname from googleAuth._
