// TODO: refactor: move editing functionality here, use <Modal/> (or <Editable/> ?)
import { useLoaderData, Form, Link as RRLink } from "react-router-dom";
import {
  useDisclosure,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDateAndTime, fetchData } from "../util/globalFunctions.js";

// Loader function to fetch event specific data (dynamic path)
export const loader = async ({ params }) =>
  fetchData([{ name: "event", path: `/events/${params.eventId}` }]);

export const EventPage = () => {
  const { event } = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Stack direction="row" justify="end">
        <Button as={RRLink} to={`/event/${event.id}/edit`}>
          Edit
        </Button>
        <Button onClick={onOpen}>Delete</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Delete Event</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure that you want to delete this event?
              </ModalBody>
              <ModalFooter>
                <Stack direction="row" spacing={2}>
                  <Form method="post" action="delete">
                    <Button type="submit">Delete</Button>
                  </Form>
                  <Button onClick={onClose}>Cancel</Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Stack>
    </Flex>
  );
};
