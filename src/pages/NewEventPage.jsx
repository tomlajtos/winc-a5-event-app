// TODO: get rid of isChecked state and checked map, manage checkedState via categoryIds as checkbox values
import { useState, useContext } from "react";
import { redirect, Form, Link as RRLink } from "react-router-dom";
import { RootContext } from "../context/RootContext";
import {
  useToast,
  Box,
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
  generateDateTimeStr,
} from "../util/globalFunctions";
import {
  validate,
  validateAll,
  getErrMsg,
  isInvalidInput,
} from "../util/validate";

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

  return (
    <Box backgroundColor="yellow.200">
      <Flex
        mx="auto"
        py={6}
        h={`${contentH}px`}
        width={[300, null, 500]}
        as={Form}
        method="post"
        direction="column"
        alignItems="center"
        backgroundColor="blue.200"
      >
        <Stack direction="column" spacing={5} p={4} bg="red.100">
          {/* INPUT for title */}
          <FormControl
            isRequired
            isInvalid={isInvalidInput(inputErrors, "title")}
          >
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              onChange={(e) => {
                validate(inputErrors, e.target, categoryIds, setInputErrors);
              }}
              onInvalid={(e) => e.preventDefault()}
            />
            <FormErrorMessage>
              {getErrMsg(inputErrors, "title")}
            </FormErrorMessage>
          </FormControl>
          {/* SELECT for event creator(users)*/}
          <FormControl
            isRequired
            isInvalid={isInvalidInput(inputErrors, "createdBy")}
          >
            <FormLabel>Created by:</FormLabel>
            <Select
              placeholder="Select a user"
              name="createdBy"
              onChange={(e) => {
                validate(inputErrors, e.target, categoryIds, setInputErrors);
              }}
              onInvalid={(e) => e.preventDefault()}
            >
              <option name="createdBy">{"Phantom of the EventApp"}</option>
              {users.map((user) => (
                <option key={user.id} name="createdBy">
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* FIELDSET for start/endTime */}
          <Stack as="fieldset" direction={["comlumn", null, "row"]} spacing={2}>
            <Text as="legend">Date and Time</Text>
            {/* INPUT for startTime */}
            <FormControl
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              isRequired
              isInvalid={isInvalidInput(inputErrors, "startTime")}
            >
              <FormLabel margin={0} px={2}>
                Start
              </FormLabel>
              <Input
                type="datetime-local"
                name="startTime"
                defaultValue={generateDateTimeStr(new Date())}
                onChange={(e) => {
                  validate(inputErrors, e.target, categoryIds, setInputErrors);
                }}
                onInvalid={(e) => e.preventDefault()}
              />
              <FormErrorMessage>
                {getErrMsg(inputErrors, "startTime")}
              </FormErrorMessage>
            </FormControl>
            {/* INPUT for endTime */}
            <FormControl
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              isRequired
              isInvalid={isInvalidInput(inputErrors, "endTime")}
            >
              <FormLabel margin={0} px={2}>
                End
              </FormLabel>
              <Input
                type="datetime-local"
                name="endTime"
                defaultValue={generateDateTimeStr(new Date(), { h: 1 })}
                onChange={(e) => {
                  validate(inputErrors, e.target, categoryIds, setInputErrors);
                }}
                onInvalid={(e) => e.preventDefault()}
              />
              <FormErrorMessage>
                {getErrMsg(inputErrors, "endTime")}
              </FormErrorMessage>
            </FormControl>
          </Stack>
          {/* INPUT for description */}
          <FormControl
            isRequired
            isInvalid={isInvalidInput(inputErrors, "description")}
          >
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              onChange={(e) => {
                validate(inputErrors, e.target, categoryIds, setInputErrors);
              }}
              onInvalid={(e) => e.preventDefault()}
            />
            <FormErrorMessage>
              {getErrMsg(inputErrors, "description")}
            </FormErrorMessage>
          </FormControl>
          {/* CHECKBOX GR. for categories */}
          <FormControl
            as={"fieldset"}
            isInvalid={isInvalidInput(inputErrors, "categoryIds")}
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
                  onChange={(e) => {
                    handleCheckboxChanges(e, setCategoryIds);
                    validate(
                      inputErrors,
                      e.target,
                      categoryIds,
                      setInputErrors,
                    );
                  }}
                  onInvalid={(e) => e.preventDefault()}
                >
                  {category.name}
                </Checkbox>
              ))}
            </Stack>
            <FormErrorMessage>
              {getErrMsg(inputErrors, "categoryIds")}
            </FormErrorMessage>
          </FormControl>
          {/* INPUT for image(url) */}
          <FormControl isInvalid={isInvalidInput(inputErrors, "image")}>
            <FormLabel>Add an image URL</FormLabel>
            <Input
              type="url"
              name="image"
              onChange={(e) => {
                validate(inputErrors, e.target, categoryIds, setInputErrors);
              }}
              onInvalid={(e) => e.preventDefault()}
            />
            <FormErrorMessage>
              {getErrMsg(inputErrors, "image")}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        {/* form button group */}
        <Stack w="full" direction="row" spacing={2} p={4} justifyContent="end">
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
      </Flex>
    </Box>
  );
};
