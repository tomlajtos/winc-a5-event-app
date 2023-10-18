import { useState, useContext } from "react";
import { redirect, useLoaderData, Form } from "react-router-dom";
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
  setCheckedItemMap,
  createCheckedIdsArr,
  fetchData,
  generateDateTimeStr,
} from "../util/globalFunctions";

export const loader = async ({ params }) =>
  fetchData([{ name: "event", path: `/events/${params.eventId}` }]);

export const EditEventPage = () => {
  const { categories } = useContext(RootContext);
  const { event } = useLoaderData();

  const initialCheckedItemMap = new Map(initCheckedItemMap(categories, false));
  const [isChecked, setIsChecked] = useState(
    setCheckedItemMap(initialCheckedItemMap, event.categoryIds)
  );

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
          <Input type="text" name="title" defaultValue={event.title} />
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
              defaultValue={generateDateTimeStr(event.startTime)}
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
              defaultValue={generateDateTimeStr(event.endTime)}
            />
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </Stack>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" defaultValue={event.description} />
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
          <Input type="url" name="image" defaultValue={event.image} />
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
