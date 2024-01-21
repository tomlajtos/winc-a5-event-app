// TODO: > vertical card layout for small screens

// React and React Router imports
import { useMemo } from "react";
import { useRouteLoaderData } from "react-router-dom";
// chakra-ui imports
import { Heading } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardFooter,
  Center,
  Image,
  Stack,
  Text,
  Tag,
} from "@chakra-ui/react";
// Util and i/o imports
import { formatDateAndTime } from "../../util/datetime.js";
import { Logger } from "../../util/Logger";
import { log } from "../../util/log.js";
// Asset imports
import placeholderImgUrl from "../../assets/eventImgPlaceholder_300.svg";

export const EventCard = ({ event }) => {
  const { categories } = useRouteLoaderData("root");

  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);

  const start = useMemo(
    () => formatDateAndTime(event.startTime),
    [event.startTime],
  );
  const end = useMemo(() => formatDateAndTime(event.endTime), [event.endTime]);

  const image = event.image === "" ? placeholderImgUrl : event.image;

  return (
    <Card
      background="gray.50"
      width="lg"
      height="240px"
      direction="row"
      variant="outline"
      py={4}
      px={3}
    >
      {image ? (
        <Image
          boxSize="206px"
          objectFit="cover"
          src={event.image === "" ? placeholderImgUrl : event.image}
        />
      ) : (
        <Center boxSize="206px" bg="gray.300">
          Loading...
        </Center>
      )}
      <Stack flex={1}>
        <CardBody pt={0} pb={2} pr={0}>
          <Heading size="lg" noOfLines={1}>
            {event.title}
          </Heading>
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
            <Text pt={4} height={16} noOfLines={2} color="gray.700">
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
