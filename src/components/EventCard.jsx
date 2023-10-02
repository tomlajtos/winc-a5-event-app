import { useRoot } from "../context/RootContext.jsx";
import { Heading } from "@chakra-ui/react";
import { Image, Text, Card, CardBody, CardFooter } from "@chakra-ui/react";

export const EventCard = ({ event }) => {
  const startTime = new Date(event.startTime).toDateString();
  const endTime = new Date(event.endTime).toDateString();
  const { categories } = useRoot();
  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);
  console.log(eventCategories);

  return (
    <Card maxW={"sm"} variant={"elevated"}>
      <CardBody>
        <Heading size={"lg"} px={2} py={"4"}>
          {event.title}
        </Heading>
        <Image src={event.image} />
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
    </Card>
  );
};
