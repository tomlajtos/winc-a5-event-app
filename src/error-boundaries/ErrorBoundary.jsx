import { useRouteError } from "react-router-dom";
import {
  Center,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export const ErrorBoundary = () => {
  const error = useRouteError();
  console.error("ErrorBoundary\n", error);
  return (
    <Center minH="100vh">
      <Container size="lg">
        <Alert status="error" display="flex" flexDirection="column">
          <AlertIcon boxSize="69px" pb={4} />
          <AlertTitle>The shit has hit the fan...!</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </Container>
    </Center>
  );
};
