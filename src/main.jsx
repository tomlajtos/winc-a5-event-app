// React imports
import React from "react";
import ReactDOM from "react-dom/client";

// React Router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Chakra-Ui imports
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/index";
// Context imports
// App component imports
import { Root, loader as rootLoader } from "./root/Root";
import { GlobalLayout } from "./root/GlobalLayout.jsx";
import { ErrorBoundary } from "./error-boundaries/ErrorBoundary";
import {
  EventsPage,
  loader as eventsLoader,
} from "./pages/events-page/EventsPage";

import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { NewEventPage, action as createEvent } from "./pages/NewEventPage";
import { action as eventActions } from "./io/mutate.js";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <GlobalLayout />,
        id: "globalLayout",
        errorElement: <ErrorBoundary />,
        children: [
          {
            id: "events",
            element: <EventsPage />,
            index: true,
            loader: eventsLoader,
          },
          {
            path: "/event/:eventId",
            id: "event",
            element: <EventPage />,
            loader: eventLoader,
            action: eventActions,
          },
          {
            path: "/event/new",
            id: "newEvent",
            element: <NewEventPage />,
            action: createEvent,
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
