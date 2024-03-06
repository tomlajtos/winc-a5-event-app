// Chakra-ui imports
import { Collapse, Stack, Text } from "@chakra-ui/react";

export const ErrorDetails = ({ error, show }) => {
  const { name, message, stackLines, status, statusText, url } = error;

  return (
    <Collapse in={show}>
      <Stack
        className="collapse-content"
        direction="column"
        maxW="full"
        align="start"
      >
        {/* if not derived from a request */}
        {!status && (
          <Stack py={2} spacing={2}>
            <Text
              textAlign="left"
              fontSize={["md", "lg"]}
              textDecor="underline"
            >
              {name}:
            </Text>
            <Text textAlign="left" fontWeight={600} fontSize={["md", "lg"]}>
              {message}
            </Text>
          </Stack>
        )}

        {/* error is a request - HTTP error */}
        {status && (
          <Stack py={2} px={[2, 4, 6]} spacing={1} maxW="full">
            <Text textAlign="left" fontWeight={600} fontSize={["md", "lg"]}>
              {message}
            </Text>
            <Text
              textAlign="left"
              fontSize={["md", "lg"]}
              textDecor="underline"
              mt={2}
            >
              {name}:
            </Text>
            <Text textAlign="left" pl={2} fontSize={["sm", "md"]}>
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

        {/* Error-stack */}
        <Stack bg="blackAlpha.500" px={[2, 4]} maxW="full">
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
      </Stack>
    </Collapse>
  );
};
