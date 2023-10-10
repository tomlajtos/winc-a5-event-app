//TODO: investigate useRoot > categories is undefined on page refresh
// make code nicer
import { Form, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useRoot } from "../context/RootContext";
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  handleCheckboxChanges,
  initCheckedItemMap,
} from "../util/globalFunctions";

export const loader = async () => {
  const categories = await fetch("http://localhost:3003/categories");
  return { categories: await categories.json() };
};

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

// generic function to create an array of checked checkbox Ids from a Map of {id,boolean} key - value pairs
const createCheckedIdsArr = (checkedMap) =>
  Array.from(checkedMap).reduce(
    (ids, cat) => (cat[1] === true ? (ids = [...ids, cat[0]]) : ids),
    [],
  );

export const NewEventPage = () => {
  // const { categories, isErrorCategories } = useRoot();
  const { categories } = useLoaderData();

  const categorySelections = new Map(initCheckedItemMap(categories));

  const [isChecked, setIsChecked] = useState(new Map([...categorySelections]));
  console.log(isChecked);

  return (
    <Flex
      h="full"
      as={Form}
      method="post"
      direction="column"
      alignItems="center"
      backgroundColor="white"
    >
      <Stack direction="column" spacing={5} minW={[300, null, 500]} p={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <Stack as="fieldset" direction={["comlumn", null, "row"]} spacing={2}>
          <Text as="legend">Date and Time</Text>
          <FormControl
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <FormLabel margin={0} px={2}>
              Start
            </FormLabel>
            <Input type="datetime-local" name="startTime" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <FormLabel margin={0} px={2}>
              End
            </FormLabel>
            <Input type="datetime-local" name="endTime" />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </Stack>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl as={"fieldset"}>
          <Text as="legend">Categories</Text>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {categories.map((category) => (
              <Checkbox
                id={category.id}
                key={category.id}
                name="categoryIds"
                value={createCheckedIdsArr(isChecked)}
                onChange={(e) =>
                  handleCheckboxChanges(e, isChecked, setIsChecked)
                }
              >
                {category.name}
              </Checkbox>
            ))}
          </Stack>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Add an image URL</FormLabel>
          <Input type="url" name="image" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <Stack
          w="inherit"
          direction="row"
          spacing={2}
          p={4}
          justifyContent="end"
        >
          <Button type="submit" variant="ghost" size="lg" colorScheme="purple">
            Save
          </Button>
          <Button type="reset" variant="ghost" size="lg" colorScheme="red">
            Cancel
          </Button>
        </Stack>{" "}
      </Stack>
    </Flex>
  );
};
