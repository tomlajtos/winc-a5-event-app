import { useState } from "react";
import { Form } from "react-router-dom";
// import { RootContext } from "../context/RootContext";
import {
  Button,
  Checkbox,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  handleCheckboxChanges,
  initCheckedItemMap,
  setCheckedItemMap,
  createCheckedIdsArr,
  generateDateTimeStr,
  // checkFormDataOnSubimt,
} from "../../util/globalFunctions";
import { validate } from "../../util/validate";

export const EditEventForm = ({ categories, event, onClose }) => {
  const initialCheckedItemMap = new Map(initCheckedItemMap(categories, false));
  const [isChecked, setIsChecked] = useState(
    setCheckedItemMap(initialCheckedItemMap, event.categoryIds)
  );
  const checkboxValues = createCheckedIdsArr(isChecked);

  const [inputErrors, setInputErrors] = useState(new Map());

  console.log(inputErrors);
  console.log("%checkbox value", "color:yellow", checkboxValues);
  // NOTE: novalidate attr of form prevents the built in validation, useful when if custom validation is used

  return (
    <Stack
      as={Form}
      method="post"
      action="edit"
      direction="column"
      spacing={5}
      p={4}
      maxW="500px"
      onSubmit={(e) =>
        inputErrors.size > 0
          ? (e.preventDefault(), console.log(inputErrors))
          : onClose()
      }
    >
      <FormControl isInvalid={inputErrors.has("title")} isRequired>
        <FormLabel fontWeight="bolder">Title</FormLabel>
        <Input
          type="text"
          name="title"
          defaultValue={event.title}
          onInput={(e) => {
            console.log("before.validate", e.target.name, e.target.validity);
            validate(inputErrors, e.target, e.target.validity, setInputErrors);
          }}
        />
        <FormErrorMessage>Event title is required</FormErrorMessage>
      </FormControl>

      <Stack as="fieldset" direction="column" spacing={2}>
        <Text as="legend" pb={1} fontWeight="bolder">
          Date and Time
        </Text>
        <FormControl
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          isInvalid={inputErrors.has("startTime")}
          isRequired
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <FormLabel margin={0} px={2}>
              Start
            </FormLabel>
            <Input
              type="datetime-local"
              name="startTime"
              defaultValue={generateDateTimeStr(event.startTime)}
              justifySelf="stretch"
              onChange={(e) => console.log("time:", Object.keys(e.target))}
            />
          </Stack>
          <FormErrorMessage alignSelf="end" py={1}>
            Start time is required.
          </FormErrorMessage>
        </FormControl>

        <FormControl
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          isInvalid={inputErrors.has("endTime")}
          isRequired
          // isInvalid={inputError.missing.endTime}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <FormLabel margin={0} px={2}>
              End
            </FormLabel>
            <Input
              type="datetime-local"
              name="endTime"
              defaultValue={generateDateTimeStr(event.endTime)}
            />
          </Stack>
          <FormErrorMessage alignSelf="end" py={1}>
            End time is required.
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <FormControl isInvalid={inputErrors.has("description")} isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" defaultValue={event.description} />
        <FormErrorMessage>Event description is required.</FormErrorMessage>
      </FormControl>

      <FormControl
        as={"fieldset"}
        isInvalid={inputErrors.has("categoryIds")}
        isRequired
      >
        <Text as="legend">Categories</Text>
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          {categories.map((category) => (
            <Checkbox
              id={category.id}
              key={category.id}
              name="categoryIds"
              isChecked={isChecked.get(category.id)}
              value={checkboxValues}
              onChange={(e) => {
                handleCheckboxChanges(e, isChecked, setIsChecked);
                console.log(
                  "%ccheckbox required:",
                  "color:red",
                  e.target.required,
                  "%ccheckbox cheked:",
                  e.target.checked,
                  e.target.validity,
                  e.target.value
                );

                validate(
                  inputErrors,
                  e.target,
                  e.target.validity,
                  setInputErrors
                );
              }}
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
        <FormErrorMessage>At least one category is required.</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={inputErrors.has("image")}>
        <FormLabel>Add an image URL</FormLabel>
        <Input
          type="url"
          name="image"
          defaultValue={event.image}
          errorBorderColor="orange.300"
          onChange={(e) => console.log(`validating '${e.target.name}' input`)}
        />
        <FormErrorMessage textColor="orange.500">
          Your event would look nicer with an image, it is not required though.
        </FormErrorMessage>
      </FormControl>
      <Stack direction="row" spacing={2} py={4} px={0} justifyContent="end">
        <Button type="submit" variant="ghost" size="lg" colorScheme="purple">
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
    </Stack>
  );
};
