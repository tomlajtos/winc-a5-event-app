import { Link as RRLink } from "react-router-dom";
import { MenuItem, Stack } from "@chakra-ui/react";
// import { Logger } from "../../../../util/Logger";

export const Navigation = () => {
  return (
    <Stack as="nav" spacing={0}>
      <MenuItem
        as={RRLink}
        to={"/"}
        px={6}
        fontSize={"xl"}
        fontWeight="thin"
        color="gray.900"
      >
        Events
      </MenuItem>

      <MenuItem
        as={RRLink}
        to={"/event/new"}
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
