import {
  useDisclosure,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Collapse,
  Container,
  Flex,
  Spacer,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { prettifyError } from "../util/error";

export const ErrorUi = ({ error }) => {
  const { name, message, stackLines, status, statusText, url } =
    prettifyError(error);
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container maxW={["full", null, "3xl"]}>
      <Alert
        status="error"
        px={[2, 4, 8]}
        py={6}
        display="flex"
        flexDirection="column"
        color="gray.50"
        bg="blackAlpha.500"
        rounded="2xl"
      >
        <AlertIcon boxSize="69px" pb={6} />

        <AlertTitle fontSize="lg">Something went wrong...</AlertTitle>

        <AlertDescription width="full">
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
            <Collapse
              w={"250px"}
              in={isOpen}
              p={0}
              m={0}
              animateOpacity
              bg="purple.400"
            >
              {!status && (
                <Stack py={2} spacing={3}>
                  <Text textAlign="left" fontSize="lg" textDecor="underline">
                    {name}:
                  </Text>
                  <Text textAlign="left" fontWeight={600} fontSize="lg">
                    {message}
                  </Text>
                </Stack>
              )}
              {status && (
                <Stack py={2} spacing={2}>
                  <Text textAlign="left" fontWeight={600} fontSize="lg">
                    {message}
                  </Text>
                  <Text textAlign="left" fontSize="lg" textDecor="underline">
                    {name}:
                  </Text>
                  <Text textAlign="left" pl={2}>
                    <Text as="span" mr={3} fontWeight="bolder">
                      {status}
                    </Text>
                    <Text as="span" mr={2}>
                      {statusText && statusText}
                    </Text>
                    <Text as="span">{url && `(${url})`}</Text>
                  </Text>
                </Stack>
              )}
              <Spacer height={2} />
              <Stack bg="blackAlpha.500" px={0} maxW="full">
                {stackLines.map((line, index) =>
                  index !== 0 ? (
                    <Text
                      key={`stack-line_${index}`}
                      textAlign="left"
                      maxW="full"
                      my={1}
                      color="white"
                    >
                      {">> "}
                      {line}
                    </Text>
                  ) : null,
                )}
              </Stack>
            </Collapse>
          </Stack>
        </AlertDescription>
      </Alert>
    </Container>
  );
};
