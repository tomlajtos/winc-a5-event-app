// React imports
import React, { useState, useContext } from "react";
// React Router imports
import { useLoaderData, Link as RRLink } from "react-router-dom";
// ChakraUi imports
import { Flex, Heading, Wrap } from "@chakra-ui/react";
// Context and custom hook imports
import { RootContext } from "../context/RootContext";
// Util imports
import { fetchData } from "../util/globalFunctions";
// App component imports
import { EventCard } from "../components/EventCard";

export const loader = async () =>
  fetchData([{ name: "events", path: "/events" }]);

export const EventsPage = () => {
  let { events } = useLoaderData();
  const { filterQ, searchQ, headerHeight } = useContext(RootContext);

  const filteredEvents = events
    .filter((event) => {
      if (!filterQ.length) {
        return null;
      } else if (event.categoryIds.some((id) => filterQ.includes(id))) {
        return event;
      }
    })
    .filter((event) => {
      if (searchQ === "") {
        return events;
      } else if (event.title.toLowerCase().includes(searchQ.toLowerCase())) {
        return event;
      }
    });

  console.log("header height:", headerHeight);
  return (
    <Flex direction={"column"}>
      <Heading
        fontSize="2rem"
        px={[2, 4, 8, null, 12]}
        py={3}
        position="sticky"
        top={headerHeight}
        zIndex="sticky"
        backgroundColor="gray.200"
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        Events
      </Heading>
      <Wrap direction={"row"} justify="center" spacing={4} py={6}>
        {filteredEvents.map((event) => (
          <RRLink key={event.id} to={`/event/${event.id}`}>
            <EventCard event={event} />
          </RRLink>
        ))}
      </Wrap>
    </Flex>
  );
};
