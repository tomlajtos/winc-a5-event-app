// React and RRouter imports
import { useState } from "react";
import { Form } from "react-router-dom";

// Context imports
// import { RootContext } from "../context/RootContext";

// chakra-ui imports
import { useToast, Button, Flex, Stack, Text } from "@chakra-ui/react";
// component imports
import { TextInputControl } from "./form-controlls/TextInputControl";
import { DateTimeControl } from "./form-controlls/DateTimeControl";
import { TextareaControl } from "./form-controlls/TextareaControl";
import { CheckboxGrControl } from "./form-controlls/CheckboxGrControl";
import { UrlInputControl } from "./form-controlls/UrlInputControl";
import { SelectControl } from "./form-controlls/SelectControl";
// util imports
import { generateDateTimeStr } from "../../util/globalFunctions";

export const EditEventForm = ({ categories, users, event, onClose }) => {
  const [categoryIds, setCategoryIds] = useState(event.categoryIds);
  const [inputErrors, setInputErrors] = useState(new Map());
  const toast = useToast();
  const stateProps = {
    categoryIds: categoryIds,
    setCategoryIds: setCategoryIds,
    errors: inputErrors,
    setErrors: setInputErrors,
  };

  // NOTE: 'novalidate' attr. of form prevents the built in validation, useful when custom validation is used
  //
  return (
    <Flex
      as={Form}
      width="full"
      method="post"
      action="edit"
      direction="column"
      alignItems="stretch"
      backgroundColor="transparent"
      onSubmit={(e) => (inputErrors.size > 0 ? e.preventDefault() : onClose())}
    >
      <Stack
        direction="column"
        spacing={5}
        // p={4}
        px={0}
        mx={0}
      >
        {/* INPUT for title */}
        <TextInputControl
          label="Title"
          inputName="title"
          defaultValue={event.title}
          isRequired={true}
          {...stateProps}
        />
        {/* SELECT for event creator(users)*/}
        <SelectControl
          lable="Created by"
          inputName="createdBy"
          defaultValue={event.createdBy}
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
          defaultValue={event.location}
          isRequired={true}
          {...stateProps}
        />
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
      <Stack
        direction="row"
        spacing={2}
        py={4}
        px={0}
        justifyContent="end"
        width="full"
      >
        <Button
          type="submit"
          variant="ghost"
          size="lg"
          colorScheme="purple"
          onClick={(e) => {
            if (inputErrors.size > 0) {
              e.preventDefault();
              toast({
                title: "Editing is incomplete",
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
          type="button"
          variant="ghost"
          size="lg"
          colorScheme="red"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Stack>
    </Flex>
  );
};
