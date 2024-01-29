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
import { GlobalLayout, loader as eventsLoader } from "./root/GlobalLayout.jsx";

import { ErrorBoundary } from "./error-boundaries/ErrorBoundary";
import { EventsPage } from "./pages/events-page/EventsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      id: "root",
      element: <Root />,
      loader: rootLoader,
      errorElement: <ErrorBoundary />,
      children: [
        {
          id: "globalLayout",
          element: <GlobalLayout />,
          // eventsLoader makes more sence here than in events page
          loader: eventsLoader,
          errorElement: <ErrorBoundary />,
          children: [
            {
              id: "events",
              element: <EventsPage />,
              // set as index element so it renders in path: "/"
              index: true,
            },
            {
              path: "/event/:eventId",
              id: "event",
              async lazy() {
                let { EventPage, loader } = await import("./pages/EventPage");
                let { action } = await import("./io/mutate");
                return {
                  loader: loader,
                  action: action,
                  Component: EventPage,
                };
              },
            },
            {
              path: "/event/new",
              id: "newEvent",
              async lazy() {
                let { NewEventPage, action } = await import(
                  "./pages/NewEventPage"
                );
                return {
                  action: action,
                  Component: NewEventPage,
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
      // v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      // v7_startTransition: true,
    },
  },
);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
