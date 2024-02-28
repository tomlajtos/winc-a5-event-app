// import { useOutletContext } from "react-router-dom";
import { Avatar, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useStaticData } from "../../context/StaticDataContext";
import phantom from "../../assets/phantom_mask.svg";
import { Logger } from "../../util/Logger";

export const EventCreator = ({ event }) => {
  const { users } = useStaticData();
  const [user] = users.filter((user) => user.id === Number(event.createdBy));

  return (
    <Logger name="EventCreator" level={5}>
      <Stack>
        <Heading size={"md"}>Created by:</Heading>
        {user ? (
          <Flex gap={4} alignItems="center">
            <Avatar size="lg" name={user.name} src={user.image} />
            <Text fontSize="2xl">{user.name}</Text>
          </Flex>
        ) : (
          <Flex py={2} direction="row" align="center" gap={2}>
            <Avatar
              size="md"
              name="Unknown Person"
              src={event.createdBy ? phantom : null}
            />
            <Text>{event.createdBy ? event.createdBy : "Unknown Person"}</Text>
          </Flex>
        )}
      </Stack>
    </Logger>
  );
};
