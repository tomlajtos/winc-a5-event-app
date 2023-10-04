import { Input, Stack } from "@chakra-ui/react";
import { useRoot } from "../context/RootContext";

export const Search = () => {
  const rootContext = useRoot();
  console.log(rootContext);
  return (
    <Stack backgroundColor={"red.500"} p={2}>
      <Input
        sx={{ border: "1px, solid, red" }}
        variant={"filled"}
        focusBorderColor="gray.400"
        placeholder="Search for an event..."
      />
    </Stack>
  );
};
