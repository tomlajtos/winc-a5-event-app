//TODO: investigate useRoot > categories is undefined on page refresh
// make code nicer
import { Form, redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useRoot } from "../context/RootContext";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Stack,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch("http://localhost:3003/categories");
  return { categories: await categories.json() };
};

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  formData.categoryIds = formData.categoryIds
    .split(",")
    .map((id) => Number(id));

  const response = await fetch("http://localhost:3003/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  // console.log("form post-data:", data);
  return redirect(`/event/${data.id}`);
};

export const NewEventPage = () => {
  // const { categories, isErrorCategories } = useRoot();
  const { categories } = useLoaderData();
  // console.log("categories", categories);

  const categorySelections = new Map([]);
  categorySelections.set(1, false);
  categorySelections.set(2, false);
  categorySelections.set(3, false);

  const [isChecked, setIsChecked] = useState(new Map([...categorySelections]));
  console.log(isChecked);

  return (
    <Form method="post">
      <Stack direction="column" spacing={5} backgroundColor={"gray.400"} p={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Start date and time</FormLabel>
          <Input type="datetime-local" name="startTime" />
          <FormHelperText>Select the date and time</FormHelperText>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>End date and time</FormLabel>
          <Input type="datetime-local" name="endTime" />
          <FormHelperText>Select the date and time</FormHelperText>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Provide a short description</FormLabel>
          <Textarea name="description" />
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Categories</FormLabel>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            {categories.map((category, index) => (
              <Checkbox
                key={category.id}
                name="categoryIds"
                value={Array.from(isChecked).reduce(
                  (ids, cat) =>
                    cat[1] === true ? (ids = [...ids, cat[0]]) : ids,
                  [],
                )}
                onChange={(e) => {
                  const newSelections = new Map([...isChecked]);
                  const chkd = newSelections.get(Number(category.id));
                  newSelections.set(Number(category.id), !chkd);
                  setIsChecked(new Map([...newSelections]));
                }}
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
      </Stack>
      <Stack spacing={2} py={4}>
        <Button type="submit" variant={"outline"} colorScheme="purple">
          Save
        </Button>
        <Button type="reset" variant={"outline"} colorScheme="red">
          Cancel
        </Button>
      </Stack>
    </Form>
  );
};
