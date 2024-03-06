// React and React Router imports
import { Link } from "react-router-dom";
// Chakra-ui imports
import { Button, Stack } from "@chakra-ui/react";

export const NavBar = () => {
  return (
    <Stack as="nav" direction="row" padding={0} alignItems="center" spacing={0}>
      <Button
        as={Link}
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
        as={Link}
        to="event/new"
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
