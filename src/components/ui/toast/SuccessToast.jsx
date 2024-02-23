import { Container, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { CloseIcon, CheckCircleIcon } from "@chakra-ui/icons";
export const SuccessToast = ({ title, description, handleClose }) => {
  return (
    <Container
      size="md"
      p={0}
      pt={1}
      pb={4}
      rounded={5}
      backgroundColor="green.600"
      color="gray.100"
    >
      <Stack direction="row" align="start" spacing={6} pl={4} pr={1}>
        <CheckCircleIcon w={8} h={8} color="gray.50" mt={2} />
        <Stack>
          <Heading size="md" pt={1} pb={2} mt={2}>
            {title}
          </Heading>
          <Text fontSize="1.1rem">{description}</Text>
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
