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
  const { filterQ, searchQ } = useContext(RootContext);
  // const { categories } = useRoot();

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

  return (
    <Flex direction={"column"}>
      <Heading size={"lg"} px={8} py={3}>
        Events
      </Heading>
      <Wrap direction={"row"} spacing={4} padding={6}>
        {filteredEvents.map((event) => (
          <RRLink key={event.id} to={`/event/${event.id}`}>
            <EventCard event={event} />
          </RRLink>
        ))}
      </Wrap>
    </Flex>
  );
};
