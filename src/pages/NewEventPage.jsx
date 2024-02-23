// React and RRouter imports
import { useRef } from "react";
import { useFetcher, useNavigation } from "react-router-dom";
//Context imports
//chakra-ui imports
import { useToast, Box, Flex, Stack } from "@chakra-ui/react";
// component imports
import { PageTitle } from "./PageTitle";
import { SaveNewButton } from "../components/forms/buttons/SaveNewButton";
import { CancelNewButton } from "../components/forms/buttons/CancelNewButton";
import { EventForm } from "../components/forms/EventForm";
// util imports
import { toaster } from "../util/toaster";
import { generateDateTimeStr } from "../util/datetime";
import { Logger } from "../util/Logger";

export const NewEventPage = () => {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const toastIdRef = useRef("");
  const toast = useToast();

  const errors = fetcher.data?.error;
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

  toaster(toast, fetcher, navigation, toastIdRef);

  return (
    <Logger type="page" name="NewEventPage" level={4}>
      <Box
        pb={6}
        width="100%"
        maxW="1280px"
        flexGrow="1"
        marginX="auto"
        bg="gray.100"
        overflowY="auto"
      >
        <Flex
          align="center"
          justify="space-between"
          borderBottom="1px solid"
          borderColor="gray.300"
        >
          <PageTitle
            title="New Event"
            position="sticky"
            top="95"
            border="none"
          />

          {/* form button group */}
          <Stack direction="row" spacing={2} pr={8} justifyContent="end">
            <SaveNewButton />
            <CancelNewButton />
          </Stack>
        </Flex>

        {/* New Event Form */}
        <Flex
          mx="auto"
          px={[4, 8]}
          py={8}
          maxWidth={["full", "container.sm"]}
          direction="column"
          alignItems="stretch"
          backgroundColor="transparent"
        >
          <EventForm
            as={fetcher.Form}
            id={"new-event-form"}
            method="POST"
            defaultValues={defaultFormValues}
            errors={errors}
          />
        </Flex>
      </Box>
    </Logger>
  );
};
