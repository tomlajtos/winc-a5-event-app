// React imports
import React from "react";
import ReactDOM from "react-dom/client";

// React Router imports
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Chakra-Ui imports
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/index";
// Context imports
import { StaticDataContextProvider } from "./context/StaticDataContext.jsx";
// App component imports
import { Root } from "./root/Root";
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
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <GlobalLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            element: <EventsPage />,
            index: true,
            loader: eventsLoader,
          },
          {
            path: "/event/:eventId",
            element: <EventPage />,
            loader: eventLoader,
            action: eventActions,
          },
          {
            path: "/event/new",
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
      <StaticDataContextProvider>
        <RouterProvider router={router} />
      </StaticDataContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
