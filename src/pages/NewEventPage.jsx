// TODO: break out form to its own component (<NewEventForm/>)

// React and RRouter imports
import { useState } from "react";
import { redirect, Form } from "react-router-dom";

//Context imports
import { useStaticData } from "../context/StaticDataContext.jsx";

//chakra-ui imports
import { Box, Container, Flex, Stack, Text } from "@chakra-ui/react";

// component imports
import { PageTitle } from "./PageTitle";
import { TextInputControl } from "../components/forms/form-controlls/TextInputControl";
import { DateTimeControl } from "../components/forms/form-controlls/DateTimeControl";
import { TextareaControl } from "../components/forms/form-controlls/TextareaControl";
import { CheckboxGrControl } from "../components/forms/form-controlls/CheckboxGrControl";
import { UrlInputControl } from "../components/forms/form-controlls/UrlInputControl";
import { SelectControl } from "../components/forms/form-controlls/SelectControl";
import { SaveNewButton } from "../components/forms/buttons/SaveNewButton";
import { CancelNewButton } from "../components/forms/buttons/CancelNewButton";

// util imports
import { generateDateTimeStr } from "../util/datetime.js";
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
  const { categories, users } = useStaticData();
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

      <Container
        as={Form}
        method="post"
        id="new-event-form"
        mx="auto"
        pt={6}
        width={["full", "sm", "container.sm"]}
        direction="column"
        alignItems="center"
      >
        <Stack direction="column" spacing={5} p={4} with="full">
          {/* INPUT for title */}
          <TextInputControl
            label="Title"
            inputName="title"
            defaultValue=""
            isRequired={true}
            {...stateProps}
          />
          {/* SELECT for event creator(users)*/}
          <SelectControl
            label="Created by"
            inputName="createdBy"
            defaultValue={"Phantom of The EventApp"}
            isRequired={true}
            users={users}
            {...stateProps}
          />
          {/* FIELDSET for start/endTime */}
          <Stack as="fieldset" direction="column" spacing={2}>
            <Text as="legend" pb={1} fontWeight="bolder">
              Date and Time
            </Text>
            {/* INPUT for startTime */}
            <DateTimeControl
              label="Start"
              inputName="startTime"
              defaultValue={generateDateTimeStr("current")}
              isRequired={true}
              {...stateProps}
            />
            {/* INPUT for endTime */}
            <DateTimeControl
              label="End"
              inputName="endTime"
              defaultValue={generateDateTimeStr("current", { h: 1, m: 0 })}
              isRequired={true}
              {...stateProps}
            />
          </Stack>
          {/* INPUT for location */}
          <TextInputControl
            label="Location"
            inputName="location"
            defaultValue=""
            isRequired={true}
            {...stateProps}
          />
          {/* INPUT for description */}
          <TextareaControl
            label="Description"
            inputName="description"
            defaultValue={event.description}
            isRequired={true}
            {...stateProps}
          />
          {/* CHECKBOX GR. for categories */}
          <CheckboxGrControl
            grTitle="Categories"
            showAsRequired={true}
            inputName="categoryIds"
            categories={categories}
            {...stateProps}
          />
          {/* INPUT for image(url) */}
          <UrlInputControl
            label="Add an image URL"
            inputName="image"
            defaultValue={event.image}
            isRequired={false}
            {...stateProps}
          />
        </Stack>
      </Container>
    </Box>
  );
};
