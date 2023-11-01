// TODO: get rid of isChecked state and checked map, manage checkedState via categoryIds as checkbox values
import { useState, useContext } from "react";
import { redirect, Form, Link as RRLink } from "react-router-dom";
import { RootContext } from "../context/RootContext";
import {
  useToast,
  Button,
  Checkbox,
  Flex,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  handleCheckboxChanges,
  // initCheckedItemMap,
  // createCheckedIdsArr,
  generateDateTimeStr,
  // initCheckedStateArr,
} from "../util/globalFunctions";
import { validate } from "../util/validate";

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
  // const data = await response.json();
  // console.log("form post-data:", data);
  return redirect(`/event/${newEventId}`);
};

export const NewEventPage = () => {
  // const { categories, isErrorCategories } = useRoot();
  const { categories, users } = useContext(RootContext);
  // const selectedCategories = initCheckedStateArr(categories, false);
  // const [isChecked, setIsChecked] = useState([...selectedCategories]);
  const [categoryIds, setCategoryIds] = useState([]);
  // console.log(categorySelections, isChecked);
  // console.log(isChecked);
  // console.log(createCheckedIdsArr(isChecked));

  const [inputErrors, setInputErrors] = useState(new Map());
  const toast = useToast();

  // TODO: move to utils, add jsDOC comments
  const getErrMsg = (name) => {
    if (inputErrors.has(name)) {
      const msg = inputErrors.get(name).message;
      return msg;
    }
  };

  // TODO: move to utils, add jsDOC comments
  const isInvalidInput = (name) => {
    return inputErrors.has(name);
  };

  console.log("%crender, new event form", "color:yellow");
  console.log("new e. > catIds:", categoryIds);
  console.log("new e. > inputErrors", inputErrors);

  return (
    <Flex
      h="full"
      as={Form}
      method="post"
      direction="column"
      alignItems="center"
      backgroundColor="white"
      onSubmit={(e) =>
        inputErrors.size > 0 ? e.preventDefault() : console.error(inputErrors)
      }
    >
      <Stack direction="column" spacing={5} minW={[300, null, 500]} p={4}>
        <FormControl isRequired isInvalid={isInvalidInput("title")}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            onChange={(e) => {
              validate(
                inputErrors,
                e.target,
                /*isChecked*/ categoryIds,
                setInputErrors
              );
            }}
            onInvalid={(e) => e.preventDefault()}
          />
          <FormErrorMessage>{getErrMsg("title")}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={isInvalidInput("createdBy")}>
          <FormLabel>Created by:</FormLabel>
          <Select
            placeholder="Select a user"
            name="createdBy"
            onChange={(e) => {
              validate(
                inputErrors,
                e.target,
                /*isChecked*/ categoryIds,
                setInputErrors
              );
            }}
            onInvalid={(e) => e.preventDefault()}
          >
            {users.map((user) => (
              <option key={user.id} name="createdBy">
                {user.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Stack as="fieldset" direction={["comlumn", null, "row"]} spacing={2}>
          <Text as="legend">Date and Time</Text>
          <FormControl
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            isRequired
            isInvalid={isInvalidInput("startTime")}
          >
            <FormLabel margin={0} px={2}>
              Start
            </FormLabel>
            <Input
              type="datetime-local"
              name="startTime"
              defaultValue={generateDateTimeStr(new Date())}
              onChange={(e) => {
                validate(
                  inputErrors,
                  e.target,
                  /*isChecked*/ categoryIds,
                  setInputErrors
                );
              }}
              onInvalid={(e) => e.preventDefault()}
            />
            <FormErrorMessage>{getErrMsg("startTime")}</FormErrorMessage>
          </FormControl>
          <FormControl
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            isRequired
            isInvalid={isInvalidInput("endTime")}
          >
            <FormLabel margin={0} px={2}>
              End
            </FormLabel>
            <Input
              type="datetime-local"
              name="endTime"
              defaultValue={generateDateTimeStr(new Date(), { h: 1 })}
              onChange={(e) => {
                validate(
                  inputErrors,
                  e.target,
                  /*isChecked*/ categoryIds,
                  setInputErrors
                );
              }}
              onInvalid={(e) => e.preventDefault()}
            />
            <FormErrorMessage>{getErrMsg("endTime")}</FormErrorMessage>
          </FormControl>
        </Stack>
        <FormControl isRequired isInvalid={isInvalidInput("description")}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            onChange={(e) => {
              validate(
                inputErrors,
                e.target,
                /*isChecked*/ categoryIds,
                setInputErrors
              );
            }}
            onInvalid={(e) => e.preventDefault()}
          />
          <FormErrorMessage>{getErrMsg("description")}</FormErrorMessage>
        </FormControl>
        <FormControl
          as={"fieldset"}
          isRequired
          isInvalid={isInvalidInput("categoryIds")}
        >
          <Text as="legend" pb={1}>
            Categories
            <Text as="span" pl={1} color="red.500">
              *
            </Text>
          </Text>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {categories.map((category) => (
              <Checkbox
                id={category.id}
                key={category.id}
                name="categoryIds"
                isChecked={categoryIds.includes(category.id)}
                value={categoryIds}
                onChange={(e) =>
                  handleCheckboxChanges(
                    e,
                    // isChecked,
                    // setIsChecked,
                    setCategoryIds
                  )
                }
                onInvalid={(e) => e.preventDefault()}
              >
                {category.name}
              </Checkbox>
            ))}
          </Stack>
          <FormErrorMessage>{getErrMsg("categoryIds")}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={isInvalidInput("image")}>
          <FormLabel>Add an image URL</FormLabel>
          <Input
            type="url"
            name="image"
            onChange={(e) => {
              validate(
                inputErrors,
                e.target,
                /*isChecked*/ categoryIds,
                setInputErrors
              );
            }}
            onInvalid={(e) => e.preventDefault()}
          />
          <FormErrorMessage>{getErrMsg("image")}</FormErrorMessage>
        </FormControl>
        <Stack
          w="inherit"
          direction="row"
          spacing={2}
          p={4}
          justifyContent="end"
        >
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            colorScheme="purple"
            onClick={(e) => {
              let errorsOnSubmit = new Map();
              let formElements = Array.from(
                e.target.parentElement.parentElement.parentElement.elements
              );
              let inputElements = formElements.filter(
                (element) => element.attributes["name"]
              );
              inputElements.forEach((input) =>
                validate(
                  errorsOnSubmit,
                  input,
                  categoryIds,
                  (map) => (errorsOnSubmit = new Map([...map]))
                )
              );
              setInputErrors(errorsOnSubmit);
              // e.preventDefault();
              console.log("Errors on click:", inputErrors);
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
            as={RRLink}
            to="/"
            variant="ghost"
            size="lg"
            colorScheme="red"
          >
            Cancel
          </Button>
        </Stack>{" "}
      </Stack>
    </Flex>
  );
};
