import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Box, Container, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { useRoot } from "../context/RootContext.jsx";
import { formatDateAndTime } from "../util/globalFunctions.js";
import { formatDateAndTime, fetchData } from "../util/globalFunctions.js";

// Loader function to fetch event specific data (dynamic path)
export const loader = async ({ params }) =>
  fetchData([{ name: "event", path: `/events/${params.eventId}` }]);

export const EventPage = () => {
  const { event } = useLoaderData();
  const { users, categories, isLoadingUsers, errorUsers } = useRoot();

  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);

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
