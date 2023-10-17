import React from "react";
import { useLoaderData, Form } from "react-router-dom";
import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDateAndTime, fetchData } from "../util/globalFunctions.js";

// Loader function to fetch event specific data (dynamic path)
export const loader = async ({ params }) =>
  fetchData([{ name: "event", path: `/events/${params.eventId}` }]);

export const EventPage = () => {
  const { event } = useLoaderData();

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

      <Form method="post" action="delete">
        <Stack>
          <Button type="submit">Delete</Button>
        </Stack>
      </Form>
    </Flex>
  );
};
