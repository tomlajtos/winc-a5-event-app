// React imports
import React, { useContext } from "react";
// React Router imports
import { useLoaderData, Link as RRLink } from "react-router-dom";
// ChakraUi imports
import { Box, Heading, Wrap } from "@chakra-ui/react";
// Context and custom hook imports
import { RootContext } from "../context/RootContext";
// App component imports
import { EventCard } from "../components/EventCard";
// Util imports
import { fetchData } from "../util/fetch.js";
import { log } from "../util/Logger";

export const loader = async () =>
  fetchData([{ name: "events", path: "/events" }]);

export const EventsPage = () => {
  let { events } = useLoaderData();
  const { filters, searchQ, rootSize } = useContext(RootContext);

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


  const wrapHeight = rootSize.height - 184; // 184 <-- Wrap[py] + Heading.height + Header.heigh

  log.comp("EventsPage", "navy", "yellow");

  return (
    <Box className="events-page-container">
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
      <Wrap
        direction={"row"}
        height={`${wrapHeight}px`}
        justify="center"
        spacing={4}
        py={6}
        px={[2, 4, 4, null, 12]}
        overflowY="scroll"
      >
        {eventsToRender.map((event) => (
          <RRLink key={event.id} to={`/event/${event.id}`}>
            <EventCard event={event} />
          </RRLink>
        ))}
      </Wrap>
    </Box>
  );
};
