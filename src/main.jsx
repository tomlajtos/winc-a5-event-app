import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { ErrorBoundry } from "./ErrorBoundaries/ErrorBoundary";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { NewEventPage, action as createEvent } from "./pages/NewEventPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundry />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        errorElement: <ErrorBoundry />,
        loader: eventsLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        errorElement: <ErrorBoundry />,
        loader: eventLoader,
        // action: editEvent, deleteEvent
      },
      {
        path: "/event/new",
        element: <NewEventPage />,
        // loader: newEventLoader,
        errorElement: <ErrorBoundry />,
        action: createEvent,
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
