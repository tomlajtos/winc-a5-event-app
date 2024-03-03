// React Router imports
import { useLoaderData } from "react-router-dom";
// ChakraUi imports
import { Flex } from "@chakra-ui/react";
// App component imports
import { PageTitle } from "../PageTitle";
import { EventsList } from "./EventsList";
// Util imports
import { fetchData } from "../../io/fetch";

export const loader = async () => fetchData("events");

export const EventsPage = () => {
  const events = useLoaderData();

  return (
    <Flex
      className="events-page-container"
      flexDir="column"
      flex="1"
      rowGap={2}
      width="100%"
      maxW="1280px"
      marginX={[0, "auto"]}
      bg="gray.100"
      overflowY="auto"
    >
      <PageTitle title="Events" fixed />
      <EventsList events={events} />
    </Flex>
  );
};
