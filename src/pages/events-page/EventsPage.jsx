// React imports
import React from "react";
import { useLoaderData } from "react-router-dom";
// React Router imports
// ChakraUi imports
import { Box } from "@chakra-ui/react";
// Context and custom hook imports
// App component imports
import { PageTitle } from "../PageTitle";
import { EventsList } from "./EventsList";
// Util imports
import { fetchData } from "../../io/fetch";
import { Logger } from "../../util/Logger";

export const loader = async () => fetchData("events");

export const EventsPage = () => {
  const events = useLoaderData();

  return (
    <Logger type="page" name="EventsPage" level={4}>
      <Box
        className="events-page-container"
        width="100%"
        maxW="1280px"
        flexGrow="1"
        marginX="auto"
        bg="gray.100"
        overflowY="auto"
      >
        <PageTitle title="Events" position="sticky" top="0px" />
        <EventsList events={events} />
      </Box>
    </Logger>
  );
};
