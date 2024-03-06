// Chakra-ui imports
import {
  useDisclosure,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
  Stack,
} from "@chakra-ui/react";
// Component imports
import { ErrorDetails } from "./ErrorDetails";
// Util and I/O imports
import { prettifyError } from "../util/error";

export const ErrorUi = ({ error }) => {
  const { name, message, stackLines, status, statusText, url } =
    prettifyError(error);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container
      className="error-alert-container"
      maxW={["full", null, "3xl"]}
      maxH="100%"
      px={[2, 4]}
      py={6}
      overflowY="auto"
    >
      <Alert
        status="error"
        px={[2, 4, 8]}
        maxW="full"
        display="flex"
        flexDirection="column"
        color="gray.50"
        bg="blackAlpha.700"
        rounded="2xl"
      >
        <AlertIcon boxSize="69px" pb={6} />

        <AlertTitle fontSize="lg">Something went wrong...</AlertTitle>

        <AlertDescription maxW="full">
          <Stack direction="column" align="start" maxW="full">
            <Button
              onClick={onToggle}
              width="fit-content"
              size="sm"
              variant="unstyled"
              textColor="gray.300"
              mt={4}
              alignSelf="center"
            >
              Toggle details
            </Button>

            {/* Error details : name, message, status etc. */}
            <ErrorDetails error={prettyError} show={isOpen} />
          </Stack>
        </AlertDescription>
      </Alert>
    </Container>
  );
};
