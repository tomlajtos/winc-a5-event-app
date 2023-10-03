import { useRoot } from "../context/RootContext.jsx";
import { Heading } from "@chakra-ui/react";
import {
  Stack,
  Image,
  Text,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { formatDateAndTime } from "../util/globalFunctions.js";

export const EventCard = ({ event }) => {
  const startTime = new Date(event.startTime).toDateString();
  const endTime = new Date(event.endTime).toDateString();
  const { categories } = useRoot();
  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);
  console.log(eventCategories);

  return (
    <Card
      background={"gray.50"}
      maxW={"xl"}
      direction={"row"}
      variant={"outline"}
      padding={4}
    >
      <Image maxW={"40%"} objectFit={"cover"} src={event.image} />
      <Stack>
        <CardBody>
          <Heading size={"lg"} px={2} py={"4"}>
            {event.title}
          </Heading>
          <Text>
            {"Starts at: "}
            {startTime}
          </Text>
          <Text>
            {"Ends at: "}
            {endTime}
          </Text>
          <Text>{event.description}</Text>
          <Text>
            {"Categories: "}
            {eventCategories}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};
