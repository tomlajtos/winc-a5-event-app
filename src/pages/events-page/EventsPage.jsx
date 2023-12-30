// React imports
import React from "react";
// React Router imports
import { useLoaderData } from "react-router-dom";
// ChakraUi imports
import { Box } from "@chakra-ui/react";
// Context and custom hook imports
import { useWindowSize } from "../../context/WindowSizeContext.jsx";
// App component imports
import { PageTitle } from "../PageTitle";
import { EventsList } from "./EventsList";
// Util imports
import { fetchData } from "../../util/fetch.js";
import { Logger } from "../../util/Logger";

export const loader = async () =>
  fetchData([{ name: "events", path: "/events" }]);

export const EventsPage = () => {
  const { events } = useLoaderData();
  const windowSize = useWindowSize();
  const minPageH = `${windowSize.height - 95}px`; //  App header height

  return (
    <Box
      className="events-page-container"
      width="100%"
      maxW="1280px"
      minH={minPageH}
      marginX="auto"
      bg="gray.100"
    >
      <Logger type="render" target="page" name="EventsPage" level={0} />
      <PageTitle title="Events" position="sticky" top="95px" />
      <EventsList events={events} />
    </Box>
  );
};
