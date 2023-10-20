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
} from "../../util/globalFunctions";

export const EditEventForm = ({ categories, event, onClose }) => {
  const initialCheckedItemMap = new Map(initCheckedItemMap(categories, false));
  const [isChecked, setIsChecked] = useState(
    setCheckedItemMap(initialCheckedItemMap, event.categoryIds)
  );

  return (
    <Stack
      as={Form}
      method="post"
      action="edit"
      direction="column"
      spacing={5}
      p={4}
      maxW="500px"
      onSubmit={onClose}
    >
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input type="text" name="title" defaultValue={event.title} />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <Stack as="fieldset" direction="column" spacing={2}>
        <Text as="legend">Date and Time</Text>
        <FormControl
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          isRequired
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
          isRequired
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
      <FormControl isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea name="description" defaultValue={event.description} />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl as={"fieldset"}>
        {/* TODO: figure out how to make 1 of 3 required warning */}
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
        <Input type="url" name="image" defaultValue={event.image} overflow="" />
        <FormErrorMessage></FormErrorMessage>
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
