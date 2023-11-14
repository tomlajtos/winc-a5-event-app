// TODO: refactor: use the new FormControl components

// React and RRouter imports
import { useState, useContext } from "react";
import { redirect, Form, Link as RRLink } from "react-router-dom";

//Context imports
import { RootContext } from "../context/RootContext";

//chakra-ui imports
import {
  useToast,
  Box,
  Button,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";

// component imports
import { TextInputControl } from "../components/Forms/form-controlls/TextInputControl";
import { DateTimeControl } from "../components/Forms/form-controlls/DateTimeControl";
import { TextareaControl } from "../components/Forms/form-controlls/TextareaControl";
import { CheckboxGrControl } from "../components/Forms/form-controlls/CheckboxGrControl";
import { UrlInputControl } from "../components/Forms/form-controlls/UrlInputControl";
import { SelectControl } from "../components/Forms/form-controlls/SelectControl";

// util imports
import { generateDateTimeStr } from "../util/globalFunctions";
import { validateAll } from "../util/validate";

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
  const { categories, users, rootSize } = useContext(RootContext);
  const [categoryIds, setCategoryIds] = useState([]);
  const [inputErrors, setInputErrors] = useState(new Map());
  const toast = useToast();
  const contentH = rootSize.height - 95;
  const stateProps = {
    categoryIds: categoryIds,
    setCategoryIds: setCategoryIds,
    errors: inputErrors,
    setErrors: setInputErrors,
  };

  console.log("NEW EVENT");
  return (
    <Box overflowY="scroll" bg="gray.100" pb={6} h={`${contentH}px`}>
      <Container
        mx="auto"
        pt={6}
        width={["full", "sm", "container.sm"]}
        as={Form}
        method="post"
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
              defaultValue={generateDateTimeStr(event.startTime)}
              isRequired={true}
              {...stateProps}
            />
            {/* INPUT for endTime */}
            <DateTimeControl
              label="End"
              inputName="endTime"
              defaultValue={generateDateTimeStr(event.endTime)}
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
            label="Categories"
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
        {/* form button group */}
        <Stack w="full" direction="row" spacing={2} py={4} justifyContent="end">
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            colorScheme="purple"
            onClick={(e) => {
              // get and use errors for validation that are not yet set as state
              const validity = validateAll(categoryIds, setInputErrors);

              if (validity.isInvalid) {
                e.preventDefault();
                toast({
                  title: "Event information is incomplete",
                  description: "Please complete the required fields.",
                  duration: 4000,
                  position: "top",
                  status: "error",
                  isClosable: true,
                });
              }
            }}
          >
            Save
          </Button>
          <Button
            as={RRLink}
            to="/"
            variant="ghost"
            size="lg"
            colorScheme="red"
          >
            Cancel
          </Button>
        </Stack>{" "}
      </Container>
    </Box>
  );
};
