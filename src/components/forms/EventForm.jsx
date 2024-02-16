// chakra-ui imports
import { Stack, Text } from "@chakra-ui/react";
// component imports
import { TextInputControl } from "./form-controlls/TextInputControl";
import { DateTimeControl } from "./form-controlls/DateTimeControl";
import { TextareaControl } from "./form-controlls/TextareaControl";
import { CheckboxGrControl } from "./form-controlls/CheckboxGrControl";
// import { HackyCheckboxGrControl } from "./form-controlls/HackyCheckboxGrControl.jsx"; // >> ALT hacky implementation of a working cbGr
import { UrlInputControl } from "./form-controlls/UrlInputControl";
import { SelectControl } from "./form-controlls/SelectControl";
// util imports
// import { log } from "../../util/log.js";

export const EventForm = ({ as, id, method, defaultValues, errors }) => {
  return (
    <Stack
      as={as}
      id={id}
      method={method}
      noValidate={true}
      direction="column"
      spacing={5}
      mx={0}
      px={0}
    >
      {/* INPUT for title */}
      <TextInputControl
        label="Title"
        inputName="title"
        defaultValue={defaultValues.title}
        errors={errors}
      />
      {/* SELECT for event creator(users)*/}
      <SelectControl
        label="Created by"
        inputName="createdBy"
        defaultValue={defaultValues.createdBy}
        errors={errors}
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
          defaultValue={defaultValues.startTime}
          errors={errors}
        />
        {/* INPUT for endTime */}
        <DateTimeControl
          label="End"
          inputName="endTime"
          defaultValue={defaultValues.endTime}
          errors={errors}
        />
      </Stack>

      {/* INPUT for location */}
      <TextInputControl
        label="Location"
        inputName="location"
        defaultValue={defaultValues.location}
        errors={errors}
      />
      {/* INPUT for description */}
      <TextareaControl
        label="Description"
        inputName="description"
        defaultValue={defaultValues.description}
        errors={errors}
      />
      {/* CHECKBOX GR. for categories */}
      <CheckboxGrControl
        grTitle="Categories"
        showAsRequired={true}
        inputName="categoryIds"
        defaultValue={defaultValues.categoryIds}
        errors={errors}
      />
      {/*Hacky CHECKBOX GR. implementation */}
      {/* <HackyCheckboxGrControl */}
      {/*   grTitle=" Categories" */}
      {/*   showAsRequired={true} */}
      {/*   inputName="categoryIds" */}
      {/*   defaultValue={defaultValues.categoryIds} */}
      {/*   errors={errors} */}
      {/* /> */}

      {/* INPUT for image(url) */}
      <UrlInputControl
        label="Add an image URL"
        inputName="image"
        defaultValue={defaultValues.image}
        errors={errors}
      />
    </Stack>
  );
};
