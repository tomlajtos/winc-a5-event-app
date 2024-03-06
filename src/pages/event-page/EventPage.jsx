// React and React Router imports
import { useFetcher, useLoaderData } from "react-router-dom";
// Chakra-ui imports
import {
  useDisclosure,
  useToast,
  Flex,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
// Context and custom hook imports
import { DeleteEventContextProvider } from "../../context/DeleteEventContext";
import { EditEventContextProvider } from "../../context/EditEventContext";
// Component imports
import { DeleteEventModal } from "./DeleteEventModal";
import { EventPageButtons } from "./EventPageButtons";
import { EventImage } from "../../components/ui/EventImage";
import { EventDates } from "../../components/EventDates";
import { EventCreator } from "./EventCreator";
import { EventCategories } from "../../components/EventCategories";
import { EditEventModal } from "./EditEventModal";
import { PageTitle } from "../PageTitle";
// Util and I/O imports
import { fetchData } from "../../io/fetch";

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
    <Flex
      className="event-page-container"
      flexDir="column"
      width="100%"
      maxW="1280px"
      marginX="auto"
      bg="gray.50"
      rowGap={3}
      overflowY="auto"
    >
      {/*Event page title & buttons section*/}
      <EventPageButtons onEditClick={editOnOpen} onDeleteClick={deleteOnOpen} />
      <PageTitle
        title={event.title}
        borderBottom="none"
        fontSize={["1.6rem", "2rem", "2.5rem"]}
      />

      {/*Event Page content section*/}
      <Stack
        className="event-page-content"
        direction={"column"}
        spacing={[4, 6, 8]}
        px={[2, 4, 6, 8, 10]}
        width="full"
      >
        {/* Image, Dates, Creator */}
        <Stack
          className="main-info"
          flexDir={["column", null, "row"]}
          spacing={[4, null, 12]}
          justify="start"
        >
          <EventImage event={event} rounded={["md", "lg", "2xl"]} />
          <Stack direction="column" spacing={[2, 3, 4]}>
            <EventDates event={event} />
            <EventCreator event={event} />
          </Stack>
        </Stack>

        {/* Location, Description, Categories */}
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Heading fontSize={["1.1rem", "1.25rem", "1.40rem"]}>
              Location:
            </Heading>
            <Text px={2} fontSize={["1rem", "1.1rem", "1.25rem"]}>
              {event.location}
            </Text>
          </Stack>

          <Stack spacing={1}>
            <Heading fontSize={["1.1rem", "1.25rem", "1.40rem"]}>
              About the event:
            </Heading>
            <Text px={2} fontSize={["1rem", "1.1rem", "1.25rem"]}>
              {event.description}
            </Text>
          </Stack>

          <Spacer />
          <EventCategories
            event={event}
            pb={[3, 5]}
            tagProps={{ size: ["md", "lg"] }}
          />
          <Spacer />
        </Stack>
      </Stack>

      {/* Edit */}
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

      {/* Delete */}
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
    </Flex>
  );
};
