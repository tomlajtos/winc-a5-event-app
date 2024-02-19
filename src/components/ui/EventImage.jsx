import { Box, Center, Image, Text } from "@chakra-ui/react";
import { Logger } from "../../util/Logger";

export const EventImage = ({ event }) => {
  return (
    <Box>
      <Logger type="render" target="component" name="EventImage" level={4} />
      {event.image ? (
        <Image
          display="block"
          src={event.image}
          boxSize="300px"
          objectFit="cover"
          rounded="2xl"
        />
      ) : (
        <Center
          boxSize="300px"
          rounded="2xl"
          backgroundColor={"purple.800"}
          color={"cyan.100"}
        >
          <Text fontSize={"2xl"} textAlign="center">
            {event.title}
          </Text>
        </Center>
      )}
    </Box>
  );
};
