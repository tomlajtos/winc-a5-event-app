// Chakra-ui imports
import { Container, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

export const SuccessToast = ({ title, description, handleClose }) => {
  return (
    <Container
      maxW="98%"
      p={0}
      pt={1}
      pb={4}
      rounded={5}
      backgroundColor="green.600"
      color="gray.100"
    >
      <Stack direction="row" align="start" spacing={6} pl={4} pr={1}>
        <CheckCircleIcon w={[6, 8]} h={[6, 8]} color="gray.50" mt={[4, 2]} />

        {/* toast text section: title, description, */}
        <Stack>
          <Heading size={["sm", "md"]} pt={1} pb={2} mt={[3, 1]}>
            {title}
          </Heading>
          <Text fontSize={["1rem", "1.1rem"]}>{description}</Text>
        </Stack>

        {/* custom close button */}
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
