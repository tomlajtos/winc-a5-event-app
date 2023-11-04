import { useContext } from "react";
import { Heading } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Tag,
  Wrap,
} from "@chakra-ui/react";

import { RootContext } from "../context/RootContext.jsx";

import { formatDateAndTime } from "../util/globalFunctions.js";
import placeholderImgUrl from "../assets/eventImgPlaceholder_300.svg";

export const EventCard = ({ event }) => {
  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);
  console.log(start);

  const { categories } = useContext(RootContext);
  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);

  return (
    <Card
      background="gray.50"
      maxW="xl"
      height="240px"
      direction="row"
      variant="outline"
      padding={3}
    >
      <Image
        maxW="40%"
        objectFit="cover"
        src={event.image}
        fallbackSrc={placeholderImgUrl}
      />
      <Stack flex={1}>
        <CardBody pt={0} pb={2} pr={0}>
          <Heading size="lg">{event.title}</Heading>
          <Stack pt={0} spacing={1} w="full">
            {start.date === end.date ? (
              <Text py={1} maxH={14} fontSize="lg">
                {start.date}
                {", "}
                {start.time}
                {" - "}
                {end.time}
              </Text>
            ) : (
              <Text py={1} maxH={14} fontSize="lg">
                {start.date}
                {", "}
                {start.time}
                {" - "}
                {end.date}
                {", "}
                {end.time}
              </Text>
            )}
            <Text pt={2} height={14} overflow="hidden">
              {event.description}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter align="start" pt={0} pb={2}>
          <Stack direction="row" spacing={2} pt={1}>
            {eventCategories.map((category) => (
              <Tag key={category} colorScheme="purple">
                {category}
              </Tag>
            ))}
          </Stack>
        </CardFooter>
      </Stack>
    </Card>
  );
};
