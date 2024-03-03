// TODO: > vertical card layout for small screens

// React and React Router imports
import { useMemo } from "react";
// chakra-ui imports
import { Heading } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardFooter,
  Spacer,
  Stack,
  Text,
  Tag,
} from "@chakra-ui/react";
// context
import { useStaticData } from "../../context/StaticDataContext.jsx";
//components
import { EventImage } from "../../components/ui/EventImage.jsx";
// Util and i/o imports
import { formatDateAndTime } from "../../util/datetime.js";

export const EventCard = ({ event }) => {
  const { categories } = useStaticData();

  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);

  const start = useMemo(
    () => formatDateAndTime(event.startTime),
    [event.startTime],
  );
  const end = useMemo(() => formatDateAndTime(event.endTime), [event.endTime]);

  const card = useMemo(() => {
    return (
      <Card
        width={["95vw", null, "lg"]}
        maxW={["95vw", "md", "lg"]}
        height={["330px", null, "240px"]}
        pt={[0, null, 4]}
        pb={[3.5, 4]}
        px={[0, null, 3]}
        direction={["column", null, "row"]}
        variant="outline"
        overflow="hidden"
        background="gray.50"
        borderColor="purple.100"
      >
        <EventImage
          event={event}
          height={["140px", "160px", "206px"]}
          width={["full", null, "206px"]}
          rounded={[null, null, "md"]}
        />

        <Stack flex={1}>
          <CardBody px={[2, null, 4]} pb={0} pt={0}>
            <Spacer height={[3, null, 0]} />
            <Heading size="lg" noOfLines={1}>
              {event.title}
            </Heading>
            <Spacer height={[2]} />
            <Stack spacing={3} w="full">
              {start.date === end.date ? (
                <Text py={1} maxH={14} fontSize="md">
                  {start.date}
                  {", "}
                  {start.time}
                  {" - "}
                  {end.time}
                </Text>
              ) : (
                <Text maxH={14} fontSize="md">
                  {start.date}
                  {", "}
                  {start.time}
                  {" - "}
                  {end.date}
                  {", "}
                  {end.time}
                </Text>
              )}
              <Text
                noOfLines={1}
                color="gray.700"
                fontSize={["sm", "md", "lg"]}
              >
                {event.description}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter align="start" p={0} px={[2, 2, 4]}>
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
  }, [event]);

  return card;
};
