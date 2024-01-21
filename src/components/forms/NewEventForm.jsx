// React and RRouter imports
// import { useState } from "react";
import { Form } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";

// Context imports
// chakra-ui imports
import { Stack, Text } from "@chakra-ui/react";
// component imports
import { TextInputControl } from "./form-controlls/TextInputControl";
import { DateTimeControl } from "./form-controlls/DateTimeControl";
import { TextareaControl } from "./form-controlls/TextareaControl";
import { CheckboxGrControl } from "./form-controlls/CheckboxGrControl";
import { UrlInputControl } from "./form-controlls/UrlInputControl";
import { SelectControl } from "./form-controlls/SelectControl";
import { SaveNewButton } from "./buttons/SaveNewButton.jsx";
// util imports
import { generateDateTimeStr } from "../../util/datetime.js";

export const NewEventForm = ({ stateProps }) => {
  const { categories, users } = useRouteLoaderData("root");

  return (
    <Stack
      as={Form}
      id="new-event-form"
      method="post"
      direction="column"
      spacing={5}
      mx="auto"
      py={8}
      px={[4, 8]}
      maxWidth={["full", "container.sm"]}
    >
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
  );
};
