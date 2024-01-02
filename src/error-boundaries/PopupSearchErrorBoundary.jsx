// TODO: not catching response errors, find solution, fetch function should expose error...

import React from "react";
import {
  useDisclosure,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Center,
  Collapse,
  Container,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";

const ErrorUi = ({ error }) => {
  const { isOpen, onToggle } = useDisclosure();
  console.log(error.stackLines);
  return (
    <Center>
      <Container size="lg">
        <Alert
          status="error"
          px={2}
          py={4}
          display="flex"
          flexDirection="column"
          color="gray.50"
          bg="blackAlpha.600"
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
    </Center>
  );
};

const pretifyError = (error) => {
  const stackLinesArr = error.stack.split("\n").slice(1);
  const getStackLineData = (stackLine) => {
    const splitLine = stackLine.split(" ").filter((str) => str.length > 0);
    const fileName = splitLine[1];
    const [lineNum] = splitLine[2].match(/\d+(?=:\d+\))/g);
    const [colNum] = splitLine[2].match(/\d+(?=\))/g);
    const prettyLine = `at ${fileName} >> (${lineNum}:${colNum})`;
    return { fileName, lineNum, colNum, line: prettyLine };
  };

  const stackLineObjects = stackLinesArr.map((line) => {
    return getStackLineData(line);
  });
  return {
    name: error.name,
    message: error.message,
    stackLines: stackLineObjects,
  };
};

class PopupSearchErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      const { error } = this.state;
      const prettyError = pretifyError(error);
      // console.log(prettyError);
      return <ErrorUi error={prettyError} />;
    }
    return this.props.children;
  }
}

export { PopupSearchErrorBoundary };
