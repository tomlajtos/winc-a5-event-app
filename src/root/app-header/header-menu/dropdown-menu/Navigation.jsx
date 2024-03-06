import { Link as RRLink } from "react-router-dom";
import { MenuItem, Stack } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Stack as="nav" spacing={[0.5, 1]}>
      <MenuItem
        as={RRLink}
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
        as={RRLink}
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
