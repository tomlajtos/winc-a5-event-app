// React and React Router imports
import { useFetcher, useLoaderData } from "react-router-dom";
// chakra-ui imports
import {
  useDisclosure,
  useToast,
  Button,
  Box,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
// Context and custom hook imports
import { EditEventContextProvider } from "../context/EditEventContext";
import { DeleteEventContextProvider } from "../context/DeleteEventContext";
// Component imports
import { PageTitle } from "./PageTitle";
import { EventImage } from "../components/ui/EventImage";
import { EventDates } from "./event-page/EventDates";
import { EventCreator } from "./event-page/EventCreator";
import { EventCategories } from "./event-page/EventCategories";
import { EditEventModal } from "./event-page/EditEventModal";
import { DeleteEventModal } from "./event-page/DeleteEventModal";
// Util and I/O imports
import { fetchData } from "../io/fetch";
import { Logger } from "../util/Logger";

export const loader = async ({ params }) => {
  const event = await fetchData(`events/${params.eventId}`);
  return event;
};

export const EventPage = () => {
  const fetcher = useFetcher();
  const event = useLoaderData();
  const toast = useToast();

  // Delete evnet modal functions
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  // Edit event modal functions
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  return (
    <Logger type="page" name="EventPage" level={4}>
      <Box
        className="event-page-container"
        width="100%"
        maxW="1280px"
        marginX="auto"
        bg="gray.100"
        pl={[4, 4, 0]}
      >
        <Spacer height={4} />

        {/*Event page title & buttons section*/}
        <Flex align="center" justify="space-between">
          <PageTitle
            title={event.title}
            borderBottom="none"
            fontSize="2.5rem"
          />
          {/* // TODO:  make buttons the last two elements in tab-order */}
          <Stack
            direction="row"
            justify="end"
            justifySelf="end"
            pr={[4, 8, 14]}
          >
            <Button
              variant="base"
              onClick={() => {
                editOnOpen();
              }}
            >
              Edit
            </Button>
            <Button variant="base" onClick={deleteOnOpen}>
              Delete
            </Button>
          </Stack>
        </Flex>

        {/*Event Page content section*/}
        <Flex direction={"column"} rowGap={8} px={10} py={12} width="full">
          <Flex directon="row" gap={8} flex={1} justify="start">
            <EventImage event={event} size="300px" rounded="2xl" />
            <Stack direction="column" rowGap={4}>
              <EventDates event={event} />
              <EventCreator event={event} />
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
            <EventCategories event={event} />
          </Stack>
        </Flex>

        {/*Edit modal in context*/}
        <EditEventContextProvider
          value={{
            event,
            editIsOpen,
            editOnOpen,
            editOnClose,
            fetcher,
            toast,
          }}
        >
          <EditEventModal />
        </EditEventContextProvider>

        {/*Delete modal in context*/}
        <DeleteEventContextProvider
          value={{
            event,
            deleteOnOpen,
            deleteIsOpen,
            deleteOnClose,
            fetcher,
            toast,
          }}
        >
          <DeleteEventModal />
        </DeleteEventContextProvider>
      </Box>
    </Logger>
  );
};
