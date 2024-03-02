import { Container, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
export const ErrorToast = ({ title, type, message, comment, handleClose }) => {
  return (
    <Container
      // size={["sm", null, "md"]}
      maxW="98%"
      p={0}
      pt={1}
      pb={4}
      rounded={5}
      backgroundColor="red.600"
      color="gray.100"
    >
      <Stack direction="row" align="start" spacing={6} pl={4} pr={1}>
        <WarningIcon w={[6, 8]} h={[6, 8]} color="gray.50" mt={[4, 2]} />
        <Stack>
          <Heading size={["sm", "md"]} pt={1} pb={2} mt={[3, 1]}>
            {title}
          </Heading>
          {type.includes("HTTP") ? (
            <Stack>
              <Text fontSize={["sm", "md"]} fontWeight="600">
                {comment}
              </Text>
              <Text fontSize="sm">
                {type}
                {":"} {message}
              </Text>
            </Stack>
          ) : (
            <Stack>
              <Text fontWeight="600" fontSize={["0.9rem", "1rem", "1.1rem"]}>
                {type}:
              </Text>
              <Text fontSize={["0.9rem", "1rem", "1.1rem"]}>{message}</Text>
            </Stack>
          )}
        </Stack>
        <IconButton
          m={0}
          size="sm"
          aria-label="Close Error Toast"
          variant="ghost"
          color="gray.200"
          colorScheme="blackAlpha"
          fontSize="12px"
          alignSelf="start"
          icon={<CloseIcon />}
          onClick={handleClose}
        />
      </Stack>
    </Container>
  );
};
