import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { SimpleGrid, Heading } from "@chakra-ui/react";
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
  const { categories, isLoadingCategories, errorCategories } = useRoot();
  console.log("events > categories:", categories);

  if (isLoadingCategories) {
    return <Heading>Loading...</Heading>;
  }
  if (errorCategories) {
    return <Heading>{errorCategories}</Heading>;
  }
  return (
    <>
      <Heading>List of events</Heading>
      <SimpleGrid spacing={4}>
        {events.map((event) => (
          <Link key={event.id} to={`/event/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};
