// TODO: break out form to its own component (<NewEventForm/>)

// React and RRouter imports
import { useState } from "react";
import { redirect, useActionData } from "react-router-dom";

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
import { log } from "../util/log.js";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  // turn categoryIds(string) into number array - to addhere to original events.json formatting
  formData.categoryIds = formData.categoryIds
    .split(",")
    .map((id) => Number(id));

  // FIX: do not mix async/await with promise chaining like in winc solution:
  // https://github.com/WincAcademy/fe-react-advanced/blob/main/exercise_routing/sending-data-solution/src/NewPost.jsx
  // INFO:
  // While it is possible, any ref I was able to find in regard of mixing the two, was advising against it.
  // The general recommendation is to use one or the other to avoid confusion.
  // const newEventId = await fetch("
  // http://localhost:3003/events", {...})
  // .then((res) => res.json())
  // .then((json) => json.id);
  try {
    const response = await fetch("http://localhost:3003/vents", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (response.ok) {
      const json = await response.json();
      const newEventId = await json.id;
      return redirect(`/event/${newEventId}`);
    } else {
      log.error("Fetch error('POST') @add>action:", response);
      log.process(`Redirect to: "/"`);
      // return redirect("/");
      return response;
    }
  } catch (e) {
    log.error("Error @NewEvnetPage>action>catch:", e);
    throw new Error(e.message);
  }
};

export const NewEventPage = () => {
  const actionData = useActionData;
  const formData = actionData;
  log.value("formData(from action) @NewEventPage:", formData);
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
