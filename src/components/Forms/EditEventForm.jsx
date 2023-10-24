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
  checkFormDataOnSubimt,
} from "../../util/globalFunctions";

export const EditEventForm = ({ categories, event, onClose }) => {
  const initialCheckedItemMap = new Map(initCheckedItemMap(categories, false));
  const [isChecked, setIsChecked] = useState(
    setCheckedItemMap(initialCheckedItemMap, event.categoryIds)
  );

  const [inputError, setInputError] = useState({ missing: {}, invalid: {} });
  console.log("missingInput:", inputError);
  const errors = new Map();

  const validate = (errorMap, inputName, validityState, setFn) => {
    const vS = validityState;
    const eM = new Map(errorMap);
    let input = inputName;
    let isMissing = false;
    let isInvalid = false;
    let isRequired = true;

    switch (inputName) {
      case "startTime": {
        input = "start time";
        break;
      }
      case "endTime": {
        input = "end time";
        break;
      }
      case "image":
        {
          isRequired = false;
        }
        console.log(input, isMissing, isInvalid, isRequired);
    }
    const missingError = `Please provide an ${inputName}.`;
    const invalidError = `Please provide a valid`;
    if (eM.has(inputName) && !vS.badInput && !vS.valueMissing) {
      eM.delete(inputName);
    }
    // if (vs)
  };

  return (
    <Stack
      as={Form}
      method="post"
      action="edit"
      direction="column"
      spacing={5}
      p={4}
      maxW="500px"
      onSubmit={(e) => {
        const checkFormResult = checkFormDataOnSubimt(e);
        console.log("on submit outer:", checkFormResult);
        if (checkFormResult.isDataComplete) {
          onClose();
        } else if (checkFormResult.isRequiredOk) {
          onClose();
        } else {
          e.preventDefault();
          checkFormResult();
          setInputError();
        }
      }}
    >
      <FormControl isInvalid={inputError.missing.title}>
        <FormLabel fontWeight="bolder">Title</FormLabel>
        <Input
          type="text"
          name="title"
          defaultValue={event.title}
          onChange={(e) => console.log(e.target.validity)}
        />
        {inputError.missing.title ? (
          <FormErrorMessage>Event title is required</FormErrorMessage>
        ) : null}
      </FormControl>

      <Stack as="fieldset" direction="column" spacing={2}>
        <Text as="legend" pb={1} fontWeight="bolder">
          Date and Time
        </Text>
        <FormControl
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          isInvalid={inputError.missing.startTime}
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
              onChange={(e) => console.log("time:", e.target.validity)}
            />
          </Stack>
          {inputError.missing.startTime ? (
            <FormErrorMessage alignSelf="end" py={1}>
              Start time is required.
            </FormErrorMessage>
          ) : null}
        </FormControl>

        <FormControl
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          isInvalid={inputError.missing.endTime}
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
          {inputError.missing.startTime ? (
            <FormErrorMessage alignSelf="end" py={1}>
              End time is required.
            </FormErrorMessage>
          ) : null}
        </FormControl>
      </Stack>

      <FormControl isInvalid={inputError.missing.description}>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" defaultValue={event.description} />
        <FormErrorMessage>Event description is required.</FormErrorMessage>
      </FormControl>

      <FormControl as={"fieldset"} isInvalid={inputError.missing.categoryIds}>
        <Text as="legend">Categories</Text>
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          {categories.map((category) => (
            <Checkbox
              id={category.id}
              key={category.id}
              name="categoryIds"
              isChecked={isChecked.get(category.id)}
              value={createCheckedIdsArr(isChecked)}
              onChange={(e) => {
                handleCheckboxChanges(e, isChecked, setIsChecked);
              }}
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
        <FormErrorMessage>At least one category is required.</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={inputError.missing.image}>
        <FormLabel>Add an image URL</FormLabel>
        <Input
          type="url"
          name="image"
          defaultValue={event.image}
          errorBorderColor="orange.300"
          onChange={(e) =>
            validate(errors, e.target.name, e.target.validity, () =>
              console.log("setting new errors")
            )
          }
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
