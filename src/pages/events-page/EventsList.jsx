// React imports
import React from "react";
// React Router imports
import { Link as RRLink } from "react-router-dom";
// ChakraUi imports
import { Wrap } from "@chakra-ui/react";
// Context and custom hook imports
import { useFilters } from "../../context/FilterContext";
// App component imports
import { EventCard } from "./EventCard";
import { useSearchQuery } from "../../context/SearchContext";
// Util imports
import { Logger } from "../../util/Logger";

export const EventsList = ({ events }) => {
  const { filters } = useFilters();
  const { searchQ } = useSearchQuery();

  const eventsToRender = events
    .filter((event) => {
      if (!filters.length) {
        return null;
      } else if (event.categoryIds.some((id) => filters.includes(id))) {
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
    <Wrap
      direction={"row"}
      width="100%"
      justify="center"
      spacing={4}
      py={6}
      px={[2, 4, 4, null, 12]}
    >
      <Logger type="render" target="component" name="events-list" level={2} />
      {eventsToRender.map((event) => (
        <RRLink key={event.id} to={`/event/${event.id}`}>
          <EventCard event={event} />
        </RRLink>
      ))}
    </Wrap>
  );
};
