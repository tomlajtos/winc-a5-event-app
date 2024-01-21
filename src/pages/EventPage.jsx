// TODO:
// - split up to sub components, improve styles, responsive styles
// - verify formData in EventPage action > mutate.js
// - implement toasters to notify user about successful/failed event editing/deletion?

// React and React Router imports
import {
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
// chakra-ui imports
import {
  useDisclosure,
  Avatar,
  Button,
  Box,
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
  Spacer,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { formatDateAndTime } from "../util/datetime.js";
import { useStaticData } from "../context/StaticDataContext.jsx";
import { EditEventForm } from "../components/forms/EditEventForm.jsx";
// Context and custom hook imports
// Component imports
import { PageTitle } from "./PageTitle";
import phantom from "../assets/phantom_mask.svg";
// Util and I/O imports
import { fetchData } from "../io/fetch";
import { log } from "../util/log";
import { Logger } from "../util/Logger";

// Loader function to fetch event specific data (dynamic path)
export const loader = async ({ params }) =>
  fetchData(`/events/${params.eventId}`, `/event/${params.eventId}`);

export const EventPage = () => {
  const event = useLoaderData();

  const fetcher = useFetcher();
  // console.log("fetcher on event page> data:", fetcher.data);
  // console.log("fetcher on event page> state:", fetcher.state);
  // console.log("fetcher @ event:", fetcher.formData);

  const actionIntent = fetcher.formData?.get("intent");
  const actionResponse = fetcher.data?.response;
  const actionState = fetcher.state;
  const actionDataTitle = fetcher.formData?.get("title");
  console.log(actionIntent, actionResponse, actionState, fetcher.formMethod);

  const editModal = useDisclosure();
  const { categories, users } = useRouteLoaderData("root");
  const deleteModal = useDisclosure();

  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);
  const [user] = users.filter((user) => user.id === Number(event.createdBy));

  // TODO: implement toast on failed or successful event editing
  if (actionIntent) {
    // console.log(`Event is being ${actionIntent}ed, not returning any JSX`);
    if (actionIntent === "delete" && actionState === "loading") {
      console.log("** Toast: EVENT DELETED:", actionDataTitle, "**");
    } else {
      console.log(actionResponse);
    }
    return null;
  }
  return (
    <Box
      className="event-page-container"
      width="100%"
      maxW="1280px"
      marginX="auto"
      bg="gray.100"
      flexGrow="1"
    >
      <Logger type="render" target="page" name="EventPage" Level={1} />
      <Spacer height={4} />
      <Flex align="center" justify="space-between">
        <PageTitle title={event.title} borderBottom="none" fontSize="2.5rem" />
        <Stack direction="row" justify="end" justifySelf="end" pr={14}>
          <Button variant="base" onClick={editModal.onOpen}>
            Edit
          </Button>
          <Button variant="base" onClick={deleteModal.onOpen}>
            Delete
          </Button>
        </Stack>
      </Flex>
      <Box px={10} py={12} width="full">
        <Flex direction={"column"} rowGap={8}>
          <Flex directon="row" gap={8} flex={1} justify="start">
            {event.image ? (
              <Image
                display="block"
                src={event.image}
                boxSize="300px"
                objectFit="cover"
                rounded="2xl"
              />
            ) : (
              <Center
                boxSize="250px"
                rounded="2xl"
                backgroundColor={"purple.800"}
                color={"cyan.100"}
              >
                <Text fontSize={"2xl"} textAlign="center">
                  {event.title}
                </Text>
              </Center>
            )}

            <Stack direction="column" rowGap={4}>
              {/* <Heading size="2xl">{event.title}</Heading> */}
              {start.date === end.date ? (
                <Text py={1} maxH={14} fontSize="2xl" alignSelf="start">
                  {start.date}
                  {", "}
                  {start.time}
                  {" - "}
                  {end.time}
                </Text>
              ) : (
                <Text py={1} maxH={14} fontSize="lg">
                  {start.date}
                  {", "}
                  {start.time}
                  {" - "}
                  {end.date}
                  {", "}
                  {end.time}
                </Text>
              )}
              <Heading size={"md"}>Created by:</Heading>
              {user ? (
                <Flex gap={4} alignItems="center">
                  <Avatar size="lg" name={user.name} src={user.image} />
                  <Text fontSize="2xl">{user.name}</Text>
                </Flex>
              ) : (
                <Flex py={2} direction="row" align="center" gap={2}>
                  <Avatar
                    size="md"
                    name="Unknown Person"
                    src={event.createdBy ? phantom : null}
                  />
                  <Text>
                    {event.createdBy ? event.createdBy : "Unknown Person"}
                  </Text>
                </Flex>
              )}
            </Stack>
          </Flex>

          <Stack spacing={3}>
            <Stack spacing={1}>
              <Heading size={"md"}>Location:</Heading>
              <Text>{event.location}</Text>
            </Stack>

            <Stack spacing={1}>
              <Heading size={"md"}>About the event:</Heading>
              <Text>{event.description}</Text>
            </Stack>

            <Stack direction={"row"} spacing={2} pt={1}>
              {categories.map((category) =>
                event.categoryIds.includes(category.id) ? (
                  <Tag key={category.name} size="lg" colorScheme={"purple"}>
                    {category.name}
                  </Tag>
                ) : null,
              )}
            </Stack>
          </Stack>
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
                      fetcher={fetcher}
                      event={event}
                      onClose={editModal.onClose}
                    />
                  </ModalBody>
                </ModalContent>
              </ModalOverlay>
            </Modal>
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
                    <Stack direction="row" spacing={4}>
                      <fetcher.Form
                        method="delete"
                        action={`/event/${event.id}`}
                      >
                        <Button
                          type="submit"
                          name="intent"
                          value="delete"
                          variant="permDel"
                          size="sm"
                          onMouseEnter={(e) =>
                            (e.target.offsetParent.style.backgroundColor =
                              // "#FED7D7")
                              "#FEB2B2")
                          }
                          onMouseLeave={(e) =>
                            (e.target.offsetParent.style.backgroundColor = "")
                          }
                        >
                          Delete
                        </Button>
                      </fetcher.Form>
                      <Button
                        text="Cancel"
                        variant="base"
                        size="sm"
                        onClick={deleteModal.onClose}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </ModalFooter>
                </ModalContent>
              </ModalOverlay>
            </Modal>
          </Portal>
          {/* </Stack> */}
        </Flex>
      </Box>
    </Box>
  );
};
