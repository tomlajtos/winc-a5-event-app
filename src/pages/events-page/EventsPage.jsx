// React imports
import React, { useContext } from "react";
// React Router imports
import { useLoaderData } from "react-router-dom";
// ChakraUi imports
import { Box, Heading } from "@chakra-ui/react";
// Context and custom hook imports
import { RootContext } from "../../context/RootContext.jsx";
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
  const { windowSize } = useContext(RootContext);
  const minPageH = `${windowSize.height - 95}px`; //  PageTitle.height

  return (
    <Box
      className="events-page-container"
      width="100%"
      maxW="1280px"
      minH={minPageH}
      marginX="auto"
      bg="gray.100"
    >
      <Logger type="render" name="EventsPage" color="navy" bg="yellow" />
      <PageTitle title="Events" position="sticky" top="95px" />
      <EventsList events={events} />
    </Box>
  );
};
