// React and React Router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Error component imports
import { RouteErrorElement } from "./error-boundaries/RouteErrorElement";
// Root and Page imports
import { Root } from "./root/Root";
import {
  EventsPage,
  loader as eventsLoader,
} from "./pages/events-page/EventsPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      id: "root",
      element: <Root />,
      errorElement: <RouteErrorElement />,
      children: [
        {
          id: "rootOutletErrorBoundary",
          errorElement: <RouteErrorElement />,
          children: [
            {
              path: "/",
              id: "events",
              loader: eventsLoader,
              element: <EventsPage />,
            },
            {
              path: "event/:eventId",
              id: "event",
              async lazy() {
                let { EventPage, loader } = await import(
                  "./pages/event-page/EventPage"
                );
                let { action } = await import("./io/mutate");
                return {
                  loader: loader,
                  action: action,
                  element: <EventPage />,
                };
              },
            },
            {
              path: "event/new",
              id: "newEvent",
              async lazy() {
                let { NewEventPage } = await import("./pages/NewEventPage");
                let { action } = await import("./io/add");
                return {
                  action: action,
                  element: <NewEventPage />,
                };
              },
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
    },
  },
);

export const Router = ({ fallbackElement }) => {
  return <RouterProvider router={router} fallbackElement={fallbackElement} />;
};
