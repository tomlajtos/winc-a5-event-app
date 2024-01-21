// React and RRouter imports
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
// Context imports
// chakra-ui imports
import { Flex, Stack, Text } from "@chakra-ui/react";
// component imports
import { TextInputControl } from "./form-controlls/TextInputControl";
import { DateTimeControl } from "./form-controlls/DateTimeControl";
import { TextareaControl } from "./form-controlls/TextareaControl";
import { CheckboxGrControl } from "./form-controlls/CheckboxGrControl";
import { UrlInputControl } from "./form-controlls/UrlInputControl";
import { SelectControl } from "./form-controlls/SelectControl";
import { SaveEditButton } from "./buttons/SaveEditButton";
import { CancelEditButton } from "./buttons/CancelEditButton";
// util imports
import { generateDateTimeStr } from "../../util/datetime.js";
import { Logger } from "../../util/Logger.jsx";

export const EditEventForm = ({ event, fetcher, onClose }) => {
  const { categories, users } = useRouteLoaderData("root");
  const [categoryIds, setCategoryIds] = useState(event.categoryIds);
  const [inputErrors, setInputErrors] = useState(new Map());
  const stateProps = {
    categoryIds: categoryIds,
    setCategoryIds: setCategoryIds,
    errors: inputErrors,
    setErrors: setInputErrors,
  };

  return (
    <Flex
      as={fetcher.Form}
      width="full"
      method="patch"
      action={`/event/${event.id}`}
      direction="column"
      alignItems="stretch"
      backgroundColor="transparent"
      onSubmit={(e) => (inputErrors.size > 0 ? e.preventDefault() : onClose())}
    >
      <Logger
        type="render"
        target="component"
        name="fetcher.Form - edit"
        level={5}
      />
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
          label="Created by"
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

      {/* form button group */}
      <Stack
        direction="row"
        spacing={2}
        py={4}
        px={0}
        justifyContent="end"
        width="full"
      >
        <SaveEditButton errors={inputErrors} />
        <CancelEditButton onClick={onClose} />
      </Stack>
    </Flex>
  );
};
