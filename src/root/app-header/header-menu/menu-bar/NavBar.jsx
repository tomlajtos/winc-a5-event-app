import { Link as RRLink } from "react-router-dom";
import { Button, Stack } from "@chakra-ui/react";

export const NavBar = () => {
  return (
    <Stack as="nav" direction="row" padding={0} alignItems="center" spacing={0}>
      <Button
        as={RRLink}
        to="/"
        py={2}
        px={4}
        rounded="full"
        fontSize="xl"
        fontWeight="thin"
        variant="ghost"
        color="gray.300"
        colorScheme="whiteAlpha"
      >
        Events
      </Button>

      <Button
        as={RRLink}
        to="/event/new"
        py={2}
        px={4}
        fontSize="xl"
        fontWeight="thin"
        rounded="full"
        variant="ghost"
        color="gray.300"
        colorScheme="whiteAlpha"
      >
        Create new
      </Button>
    </Stack>
  );
};
