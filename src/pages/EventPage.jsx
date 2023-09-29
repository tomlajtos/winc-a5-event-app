import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading, Text, Image } from "@chakra-ui/react";
import { useRoot } from "../context/RootContext.jsx";

const baseUrl = "http://localhost:3003";

export const loader = async ({ params }) => {
  const event = await fetch(`${baseUrl}/events/${params.eventId}`);

  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();
  const { users, categories } = useRoot();
  console.log("event > users:", users);
  console.log("event > categories:", categories);
  return (
    <>
      <Heading>{event.title}</Heading>
      <Image src={event.image} />
      <Text>
        {"Starts: "}
        {event.startTime}
      </Text>
      <Text>
        {"Ends: "}
        {event.endTime}
      </Text>
      <Text>{event.location}</Text>

      <Text>{event.description}</Text>
    </>
  );
};
