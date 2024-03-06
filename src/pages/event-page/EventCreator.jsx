// Chakra-ui imports
import { Avatar, Flex, Heading, Stack, Text } from "@chakra-ui/react";
// Context and custom hook imports
import { useStaticData } from "../../context/StaticDataContext";
// Assets imports
import phantom from "../../assets/phantom_mask.svg";

export const EventCreator = ({ event }) => {
  const { users } = useStaticData();
  const [user] = users.filter((user) => user.id === Number(event.createdBy));

  return (
    <Stack>
      <Heading px={0} fontSize={["lg", "xl", "2xl"]}>
        Created by:
      </Heading>
      {user ? (
        <Flex px={[2]} gap={4} alignItems="center">
          <Avatar size={["md", null, "lg"]} name={user.name} src={user.image} />
          <Text fontSize={["lg", "xl", "2xl"]}>{user.name}</Text>
        </Flex>
      ) : (
        <Flex p={[2]} direction="row" align="center" gap={2}>
          <Avatar
            size={["md", null, "lg"]}
            name="Unknown Person"
            src={event.createdBy ? phantom : null}
          />
          <Text fontSize={["lg", "xl", "2xl"]}>
            {event.createdBy ? event.createdBy : "Unknown Person"}
          </Text>
        </Flex>
      )}
    </Stack>
  );
};
