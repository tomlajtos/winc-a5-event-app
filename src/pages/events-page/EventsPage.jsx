// React imports
import React from "react";
// React Router imports
import { useLoaderData } from "react-router-dom";
// ChakraUi imports
import { Box } from "@chakra-ui/react";
// Context and custom hook imports
// App component imports
import { PageTitle } from "../PageTitle";
import { EventsList } from "./EventsList";
// Util imports
import { fetchData } from "../../io/fetch.js";
import { Logger } from "../../util/Logger";

export const loader = async () => fetchData("/events");

export const EventsPage = () => {
  const events = useLoaderData();

  return (
    <Box
      className="events-page-container"
      width="100%"
      maxW="1280px"
      flexGrow="1"
      marginX="auto"
      bg="gray.100"
    >
      <Logger type="render" target="page" name="EventsPage" level={0} />
      <PageTitle title="Events" position="sticky" top="95px" />
      <EventsList events={events} />
    </Box>
  );
};
