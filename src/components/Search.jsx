// TODO: look at useSearchParams hook for using with search??
import { useContext } from "react";
import { Input, Stack } from "@chakra-ui/react";
import { RootContext } from "../context/RootContext";
import { colors } from "../util/colorScheme";

export const Search = () => {
  const lightColors = colors.light.search;
  const { setSearchQ } = useContext(RootContext);

  return (
    <Stack p={2} justify={"center"}>
      <Input
        variant={"outline"}
        outlineColor={"gray.300"}
        focusBorderColor="gray.400"
        placeholder="Search for an event..."
        rounded={"full"}
        backgroundColor={lightColors.inputBg}
        onChange={(e) => {
          setSearchQ(e.target.value);
        }}
      />
    </Stack>
  );
};
