// React imports
import React from "react";
// React Router imports
import { useLoaderData } from "react-router-dom";
// ChakraUi imports
import { Box, Heading } from "@chakra-ui/react";
// Context and custom hook imports
// App component imports
import { EventsList } from "./EventsList";
// Util imports
import { fetchData } from "../../util/fetch.js";
import { Logger } from "../../util/Logger";

export const loader = async () =>
  fetchData([{ name: "events", path: "/events" }]);

export const EventsPage = () => {
  let { events } = useLoaderData();

  return (
    <Box className="events-page-container">
      <Logger type="render" name="EventsPage" color="navy" bg="yellow" />
      <Heading
        display="box"
        height="65px"
        fontSize="2rem"
        px={[2, 4, 8, null, 12]}
        py={3}
        backgroundColor="gray.200"
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        Events
      </Heading>
      <EventsList events={events} />
    </Box>
  );
};
