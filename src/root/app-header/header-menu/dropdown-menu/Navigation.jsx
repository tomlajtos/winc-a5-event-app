import { Link as RRLink } from "react-router-dom";
import { MenuItem, Stack } from "@chakra-ui/react";
import { Logger } from "../../../../util/Logger";

export const Navigation = () => {
  console.log("addLogger", "Navigation", [4]);
  return (
    <Stack as="nav" spacing={0}>
      <MenuItem
        as={RRLink}
        to={"/"}
        closeOnSelect="true"
        px={6}
        fontSize={"xl"}
        fontWeight="thin"
        color="gray.900"
      >
        Events
      </MenuItem>

      <MenuItem
        as={RRLink}
        to={"event/new"}
        closeOnSelect="true"
        px={6}
        fontSize={"xl"}
        fontWeight="thin"
        color="gray.900"
      >
        Create new
      </MenuItem>
    </Stack>
  );
};
