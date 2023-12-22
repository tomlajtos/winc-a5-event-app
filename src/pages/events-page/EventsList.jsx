// React imports
import React, { useContext } from "react";
// React Router imports
import { Link as RRLink } from "react-router-dom";
// ChakraUi imports
import { Wrap } from "@chakra-ui/react";
// Context and custom hook imports
import { RootContext } from "../../context/RootContext";
// App component imports
import { EventCard } from "./EventCard";
// Util imports
// import { fetchData } from "../../util/fetch.js";
// import { log } from "../../util/Logger";

export const EventsList = ({ events }) => {
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

  const wrapHeight = rootSize.height - 184; // 184 <-- Wrap.paddingY + PageTitle.height + AppHeader.height

  return (
    <Wrap
      direction={"row"}
      height={`${wrapHeight}px`}
      width="100%"
      justify="center"
      spacing={4}
      py={6}
      px={[2, 4, 4, null, 12]}
    >
      {eventsToRender.map((event) => (
        <RRLink key={event.id} to={`/event/${event.id}`}>
          <EventCard event={event} />
        </RRLink>
      ))}
    </Wrap>
  );
};
