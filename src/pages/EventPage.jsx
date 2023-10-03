import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Box, Container, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useRoot } from "../context/RootContext.jsx";
import { formatDateAndTime } from "../util/globalFunctions.js";

const baseUrl = "http://localhost:3003";

export const loader = async ({ params }) => {
  const event = await fetch(`${baseUrl}/events/${params.eventId}`);

  return {
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { event } = useLoaderData();
  const { users, categories, isLoadingUsers, errorUsers } = useRoot();

  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);

  if (isLoadingUsers) {
    return <Heading>Loading...</Heading>;
  }
  if (errorUsers) {
    return <Heading>{errorUsers}</Heading>;
  }
  return (
    <Flex direction={"column"} padding={8}>
      <Image src={event.image} />
      <Heading>{event.title}</Heading>
      <Heading size={"sm"}>Event date:</Heading>
      {start.date === end.date ? (
        <Text>{start.date}</Text>
      ) : (
        <Text>{`${start.date} - ${end.date}`}</Text>
      )}
      <Heading size={"sm"}>Starts at: </Heading>
      <Text> {start.time} </Text>
      <Heading size={"sm"}>Ends at: </Heading>
      <Text>{end.time}</Text>
      <Text>{event.location}</Text>

      <Text>{event.description}</Text>
    </Flex>
  );
};
