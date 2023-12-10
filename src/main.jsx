// React imports
import React from "react";
import ReactDOM from "react-dom/client";
// React Router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Chakra-Ui imports
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/index";
// App component imports
import { Root, loader as rootLoader } from "./components/Root";
import { ErrorBoundry } from "./ErrorBoundaries/ErrorBoundary";
import { ErrorBoundary } from "./error-boundaries/ErrorBoundary";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { NewEventPage, action as createEvent } from "./pages/NewEventPage";
import { action as deleteEvent } from "./io/delete.jsx";
import { action as editEvent } from "./io/edit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorBoundry />,
    children: [
      {
        errorElement: <ErrorBoundry />,
        children: [
          {
            path: "/",
            element: <EventsPage />,
            // errorElement: <ErrorBoundry />,
            loader: eventsLoader,
          },
          {
            path: "/event/:eventId",
            element: <EventPage />,
            // errorElement: <ErrorBoundry />,
            loader: eventLoader,
          },
          {
            path: "/event/new",
            element: <NewEventPage />,
            // errorElement: <ErrorBoundry />,
            action: createEvent,
          },
          {
            path: "/event/:eventId/edit",
            // errorElement: <ErrorBoundry />,
            action: editEvent,
          },
          {
            path: "/event/:eventId/delete",
            action: deleteEvent,
          },
        ],
      },
    ],
  },
]);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
