import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { useRoot } from "../context/RootContext";

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
      {events.map((event) => (
        <div key={event.id}>
          <Link to={`/event/${event.id}`}>{event.title}</Link>
        </div>
      ))}
    </>
  );
};
