import { useState, useContext } from "react";
import { Form, redirect } from "react-router-dom";
import { RootContext } from "../context/RootContext";
import {
  Button,
  Checkbox,
  Flex,
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
  createCheckedIdsArr,
  generateDateTimeStr,
} from "../util/globalFunctions";

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
  const { categories } = useContext(RootContext);
  const categorySelections = new Map(initCheckedItemMap(categories, false));
  const [isChecked, setIsChecked] = useState(new Map([...categorySelections]));
  // console.log(categorySelections, isChecked);
  // console.log(isChecked);
  // console.log(createCheckedIdsArr(isChecked));

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
            <Input
              type="datetime-local"
              name="startTime"
              defaultValue={generateDateTimeStr(new Date())}
            />
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
            <Input
              type="datetime-local"
              name="endTime"
              defaultValue={generateDateTimeStr(new Date(), { h: 1 })}
            />
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
                isChecked={isChecked.get(category.id)}
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
