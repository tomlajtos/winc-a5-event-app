// TODO: refactor: move editing functionality here, use <Modal/> (or <Editable/> ?)
import { useContext } from "react";
import { useLoaderData, Form } from "react-router-dom";
import {
  useDisclosure,
  Avatar,
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
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDateAndTime, fetchData } from "../util/globalFunctions.js";
import { RootContext } from "../context/RootContext.jsx";
import { EditEventForm } from "../components/Forms/EditEventForm.jsx";

// Loader function to fetch event specific data (dynamic path)
export const loader = async ({ params }) =>
  fetchData([{ name: "event", path: `/events/${params.eventId}` }]);

export const EventPage = () => {
  const { event } = useLoaderData();
  const { categories, users } = useContext(RootContext);
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);
  const [user] = users.filter((user) => user.id === event.createdBy);

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
      <Flex>
        <Avatar name={user.name} src={user.image} />
        <Text>{user.name}</Text>
      </Flex>
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
        <Button onClick={editModal.onOpen}>Edit</Button>
        <Portal>
          <Modal
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            size={["full", null, "lg"]}
          >
            <ModalOverlay
              bg="blackAlpha.500"
              backdropFilter="auto"
              backdropBlur="5px"
            >
              <ModalContent backgroundColor="whiteAlpha.900">
                <ModalHeader fontSize="2xl" background="transparent">
                  Edit event
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody background="transparent">
                  <EditEventForm
                    event={event}
                    categories={categories}
                    onClose={editModal.onClose}
                  />
                </ModalBody>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </Portal>
        <Button onClick={deleteModal.onOpen}>Delete</Button>
        <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.onClose}>
          <ModalOverlay
            bg="blackAlpha.500"
            backdropFilter="auto"
            backdropBlur="5px"
          >
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
                  <Button onClick={deleteModal.onClose}>Cancel</Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </Stack>
    </Flex>
  );
};
