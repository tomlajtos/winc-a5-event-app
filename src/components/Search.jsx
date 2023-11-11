import { useContext } from "react";
import { Center, Input } from "@chakra-ui/react";
import { RootContext } from "../context/RootContext";

export const Search = ({ inputProps, props }) => {
  const { searchQ, setSearchQ } = useContext(RootContext);

  return (
    <Center {...props}>
      <Input
        name="search"
        variant={"outline"}
        placeholder="Search for an event..."
        rounded={"full"}
        minW="225px"
        maxW="500px"
        px={6}
        color="gray.200"
        focusBorderColor="purple.300"
        defaultValue={searchQ}
        onChange={(e) => {
          setSearchQ(e.target.value);
        }}
        {...inputProps}
      />
    </Center>
  );
};
