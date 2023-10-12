import React from "react";
import { useLoaderData, Link as RRLink } from "react-router-dom";
import { Wrap, Heading } from "@chakra-ui/react";
import { useRoot } from "../context/RootContext";
import { EventCard } from "../components/EventCard";

const baseUrl = "http://localhost:3003";

export const loader = async () => {
  const events = await fetch(`${baseUrl}/events`);

  return {
    events: await events.json(),
  };
};

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
