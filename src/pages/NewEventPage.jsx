// TODO: break out form to its own component (<NewEventForm/>)

// React and RRouter imports
import { useState } from "react";
import { redirect } from "react-router-dom";

//Context imports

//chakra-ui imports
import { Box, Flex, Stack } from "@chakra-ui/react";

// component imports
import { PageTitle } from "./PageTitle";
import { SaveNewButton } from "../components/forms/buttons/SaveNewButton";
import { CancelNewButton } from "../components/forms/buttons/CancelNewButton.jsx";
import { NewEventForm } from "../components/forms/NewEventForm.jsx";
// util imports
import { Logger } from "../util/Logger.jsx";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  formData.categoryIds = formData.categoryIds
    .split(",")
    .map((id) => Number(id));

  const newEventId = await fetch("http://localhost:3003/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newEventId}`);
};

export const NewEventPage = () => {
  const [categoryIds, setCategoryIds] = useState([]);
  const [inputErrors, setInputErrors] = useState(new Map());
  const stateProps = {
    categoryIds: categoryIds,
    setCategoryIds: setCategoryIds,
    errors: inputErrors,
    setErrors: setInputErrors,
  };

  return (
    <Box
      pb={6}
      width="100%"
      maxW="1280px"
      flexGrow="1"
      marginX="auto"
      bg="gray.100"
    >
      <Logger type="render" target="page" name="new-event-page" level={2} />
      <Flex
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.300"
      >
        <PageTitle title="New Event" position="sticky" top="95" border="none" />

        {/* form button group */}
        <Stack direction="row" spacing={2} pr={8} justifyContent="end">
          <SaveNewButton categoryIds={categoryIds} setErrors={setInputErrors} />
          <CancelNewButton />
        </Stack>
      </Flex>
      <NewEventForm stateProps={stateProps} />
    </Box>
  );
};
