import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
// import { useRoot } from "../context/RootContext.jsx";
import { formatDateAndTime, fetchData } from "../util/globalFunctions.js";

// Loader function to fetch event specific data (dynamic path)
export const loader = async ({ params }) =>
  fetchData([{ name: "event", path: `/events/${params.eventId}` }]);

export const EventPage = () => {
  const { event } = useLoaderData();
  const { users, categories } = useRoot();

  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);

  return (
    <Flex direction={"column"} padding={8}>
      {event.image ? (
        <Image src={event.image} />
      ) : (
        <Center
          width={"full"}
          height={"20vh"}
          backgroundColor={"purple.800"}
          color={"cyan.100"}
        >
          <Text fontSize={"2xl"}>{event.title}</Text>
        </Center>
      )}
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
