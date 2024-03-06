// React and React Router imports
import { Link } from "react-router-dom";
// Chakra-ui imports
import { MenuItem, Stack } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Stack as="nav" spacing={[0.5, 1]}>
      <MenuItem
        as={Link}
        to={"/"}
        closeOnSelect="true"
        px={6}
        py={0}
        fontSize={["md", "lg", "xl"]}
        fontWeight="thin"
        color="gray.900"
        bg="transparent"
      >
        Events
      </MenuItem>

      <MenuItem
        as={Link}
        to={"event/new"}
        closeOnSelect="true"
        px={6}
        py={0}
        fontSize={["md", "lg", "xl"]}
        fontWeight="thin"
        color="gray.900"
        bg="transparent"
      >
        Create new
      </MenuItem>
    </Stack>
  );
};
