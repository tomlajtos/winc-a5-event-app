// React and React Router imports
import { useRef } from "react";
import { useFetcher, useNavigation } from "react-router-dom";
// Chakra-ui imports
import { useToast, Box, Flex, Stack } from "@chakra-ui/react";
// Component imports
import { CancelNewButton } from "../components/forms/buttons/CancelNewButton";
import { EventForm } from "../components/forms/EventForm";
import { PageTitle } from "./PageTitle";
import { SaveNewButton } from "../components/forms/buttons/SaveNewButton";
// Util and I/O imports
import { generateDateTimeStr } from "../util/datetime";
import { toaster } from "../util/toaster";

export const NewEventPage = () => {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const toastIdRef = useRef("");
  const toast = useToast();

  const errors = fetcher.data?.errors;
  const defaultFormValues = {
    title: "",
    createdBy: "Phantom of The EvnetApp",
    startTime: generateDateTimeStr("current"),
    endTime: generateDateTimeStr("current", { h: 1, m: 0 }),
    location: "",
    description: "",
    categoryIds: [],
    image: "",
  };

  toaster(toast, fetcher, toastIdRef, navigation);

  return (
    <Box
      pb={6}
      width="100%"
      maxW="1280px"
      flex="1"
      marginX="auto"
      bg="gray.50"
      overflowY="auto"
    >
      <Flex
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.300"
        position="sticky"
        top={0}
        zIndex="docked"
        bg="inherit"
      >
        <PageTitle title="New Event" pb={[2, 3, 4]} />

        {/* form button group */}
        <Stack direction="row" spacing={2} pr={[2, 4, 8]} justifyContent="end">
          <SaveNewButton />
          <CancelNewButton />
        </Stack>
      </Flex>

      {/* New Event Form */}
      <Flex
        mx="auto"
        px={[4, 8]}
        py={[4, 6, 8]}
        bg="blue.400"
        maxWidth={["full", "container.sm"]}
        direction="column"
        alignItems="stretch"
        backgroundColor="transparent"
      >
        <EventForm
          as={fetcher.Form}
          id="new-event-form"
          method="POST"
          defaultValues={defaultFormValues}
          errors={errors}
        />
      </Flex>
    </Box>
  );
};
