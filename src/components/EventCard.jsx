import { useRoot } from "../context/RootContext.jsx";
import { Heading } from "@chakra-ui/react";
import {
  Stack,
  Image,
  Text,
  Tag,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { formatDateAndTime } from "../util/globalFunctions.js";
import "../styles.css";

export const EventCard = ({ event }) => {
  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);

  const { categories } = useRoot();
  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);

  return (
    <Card
      background={"gray.50"}
      maxW={"xl"}
      maxH={"230px"}
      direction={"row"}
      variant={"outline"}
      padding={3}
    >
      <Image maxW={"40%"} objectFit={"cover"} src={event.image} />
      <Stack>
        <CardBody pt={0}>
          <Heading size={"lg"}>{event.title}</Heading>
          <Text pb={2}>{event.description}</Text>
          <Heading size={"sm"}>Event start:</Heading>
          <Text>
            <span>{start.date}</span> {"at"}{" "}
            <span className={"bold"}>{start.time}</span>
          </Text>
          <Heading size={"sm"}>Event ends:</Heading>
          <Text>
            <span>{end.date}</span> {"at"}{" "}
            <span className={"bold"}>{end.time}</span>
          </Text>
          <Text fontWeight={"semibold"}>{"Categories"}</Text>
          <Stack direction={"row"} spacing={2} pt={1}>
            {eventCategories.map((category) => (
              <Tag key={category} colorScheme={"purple"}>
                {category}
              </Tag>
            ))}
          </Stack>
        </CardBody>
      </Stack>
    </Card>
  );
};
