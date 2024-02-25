# NoteSet - my own app for tracking fitness results

**Important: This is the continuation of noteset_archive app with App Router, RSC and Server Actions. UI not optimize for a Desktop, only check on mobile or Inspect it with a mobile resolution.**

Making this app with an idea to use it in a gym instead of a notebook. Still WIP, plan to ship it soon. In the future might change the logo and add a hero image or a bg design pattern.

## Future updates and plans:

- _Dropdwn menu instead of input field for sets (with error if nothing is selected), custom radix ui modal or drawer for previewing workout, separate form for exercises all on create form without drawer, validation on both zod safeParse and later on data to be sure no empty or isufficient rep/weight arr is passed._

- _Add one more useFormState for validating exercise before pushing it to exercises state and error messages for all the fields, add option to edit an exercise inside create form just in case, put the whole logic into a custom hook, later on abstract some of the components for clarity._

- _When done with UI remove theme button and leave only system default._

- _Handle and display zod parse errors inside create and edit form._

- _Finish Ui inside preview dialog. Add confirmation page for editting workout._

- _Finish UI and logic for edit and workout pages._

- _Modify profile and logs page to have an actual content._ 

- _When Kinde support answers, modify register page to properly work._
