# React Advanced Assignment Project: Event App

This is the final project of the Winc Academy Front-end Course.

The app has a dashboard like appearance.

**Functionalities:**

- show a list of events
- add, edit, delete events
- show a detailed page of an event when it is clicked on
- events can be searched and/or filtered by category

**The project utilizes:**

- Vite
- Chakra UI
- StyledProps(not mandatory)
- React Router
- JsonServer to provide minimal back-end to the app

## Requirements

- The app contains a form
- The app utilizes React Router

### Events list

- The page shows a list of all events that are retrieved from the back-end server with the following details:
  title, description, image, start/end time, categories.
- The user can click on an event that leads them to the 'Event' page using React Router.
- There is a button that allows the user to add new events using a form.
- A query to add the event to the server is sent as well.
- Events can be searched based on their title.
- Events list/search results can be filtered based on categories.

### Event page

- The event page shows the following details of an event: title, start/end time, categories, user(creator) name aand image.
- The user can click on an edit button to 'edit' all details shown on the page. This can be done in a modal or on the same page, but not an external page.
- When edited the back-end data should be updated as well.
- A 'success' or 'fail' message should be shown after an update was initiated.
- The user can click on a 'delete' button to remove the event.
- When deleted, a delete query is sent to the back-end to remove the data.
- After deleting an event the user is redirected to the 'Events' page.
- Both editing and deleting an event requires user confirmation.

## Extra Challenge

_Optional, not graded._

- The app should have a responsive design.
- Utilize Context to store the categories and users to lover the number of requests sent to the back-end.
