# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. UI not optimize for a Desktop, only check on mobile or Inspect it with a mobile resolution.**

Making this app with an idea to use it in a gym instead of a notebook. Still WIP, plan to ship it soon. In the future might change the logo and add a hero image or a bg design pattern.

## Future updates and plans:

-_Try to redirect from landing page if logged in via middleware._

- _Metadata icon and notch setting for android pwa, change the angle of the icon, try hiding scrollbar with tailwind and make main tag a client wrapper to apply sliding animation with fm._

- _Add warning modal to confirm removing workout, preview modal to show preview of the workout, confirming modal to inform user before pushing a new or edited workout to db. Add confirmation component that renders if certain message is returned from server action, confirming that workout has been added or edited with revalidation and redirect to users homepage. Finish error page UI._

- _Figure out data model for db._

- _Finish UI and logic for create, edit and workout pages._

- _Set a limit on description input field to 60ch using zod._

- _Modify profile and logs page to have an actual content._
