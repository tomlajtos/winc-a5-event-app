import React from "react";
import { useLoaderData, Link as RRLink } from "react-router-dom";
import { Wrap, Heading } from "@chakra-ui/react";
import { useRoot } from "../context/RootContext";
import { fetchData } from "../util/globalFunctions";
import { EventCard } from "../components/EventCard";

export const loader = async () =>
  fetchData([{ name: "events", path: "/events" }]);

export const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <>
      <Heading px={8}>Events</Heading>
      <Wrap direction={"row"} spacing={4} padding={6}>
        {events.map((event) => (
          <RRLink key={event.id} to={`/event/${event.id}`}>
            <EventCard event={event} />
          </RRLink>
        ))}
      </Wrap>
    </>
  );
};
