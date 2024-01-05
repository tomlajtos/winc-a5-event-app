import React from "react";
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
  Text,
} from "@chakra-ui/react";

export const ErrorUi = ({ error }) => {
  const { isOpen, onToggle } = useDisclosure();
  console.log("ErrorUi > error.stackLines:", error.stackLines);
  return (
    <Container maxW="3xl">
      <Alert
        status="error"
        px={2}
        py={4}
        display="flex"
        flexDirection="column"
        color="gray.50"
        bg="blackAlpha.700"
        rounded="2xl"
      >
        <AlertIcon boxSize="69px" pb={4} />
        <AlertTitle fontSize="lg">
          Something ain&apos;t right here...
        </AlertTitle>
        <AlertDescription>
          <Flex direction="column" align="start" maxW="full">
            <Button
              onClick={onToggle}
              width="fit-content"
              size="sm"
              variant="unstyled"
              textColor="gray.400"
              mt={4}
              alignSelf="center"
            >
              Toggle details
            </Button>
            <Spacer height={2} />
            <Collapse in={isOpen} animateOpacity>
              <Text textAlign="left" fontWeight={600}>
                {error.name}
                {":"}
              </Text>
              <Text pb={2}>{error.message}</Text>
              <Box bg="gray.900" opacity="60%" p={4}>
                {error.stackLines.map((line) => (
                  <Text
                    key={line.line}
                    textAlign="left"
                    maxW="full"
                    my={1}
                    color="white"
                  >
                    {line.line}
                  </Text>
                ))}
              </Box>
            </Collapse>
          </Flex>
        </AlertDescription>
      </Alert>
    </Container>
  );
};
