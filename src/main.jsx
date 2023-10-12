// Ract imports
import React from "react";
import ReactDOM from "react-dom/client";
// React Router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Chakra-Ui imports
import { ChakraProvider } from "@chakra-ui/react";
// App component imports
import { Root, loader as rootLoader } from "./components/Root";
import { ErrorBoundry } from "./ErrorBoundaries/ErrorBoundary";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { NewEventPage, action as createEvent } from "./pages/NewEventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
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
