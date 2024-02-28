import { useMemo } from "react";
import { Card, CardBody, Heading, Stack, Text, Tag } from "@chakra-ui/react";
import { useStaticData } from "../../../../context/StaticDataContext.jsx";
import { EventImage } from "../../../../components/ui/EventImage.jsx";
import { formatDateAndTime } from "../../../../util/datetime.js";
import { Logger } from "../../../../util/Logger";

export const EventCardSmall = ({ event }) => {
  const { categories } = useStaticData();

  const start = useMemo(
    () => formatDateAndTime(event.startTime),
    [event.startTime],
  );
  const end = useMemo(() => formatDateAndTime(event.endTime), [event.endTime]);

  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);

  const smallCard = useMemo(() => {
    return (
      <Logger name={`EventCardSmall-${event.title}`} level={10}>
        <Card
          direction="row"
          overflow="hidden"
          height="100px"
          width={["350px"]}
          textAlign="left"
        >
          <EventImage event={event} size="100px" />
          <CardBody fontSize="1rem" px={2} py={2}>
            <Stack flex={1} spacing={1} m={0} py={0}>
              <Heading size="md" py={0} m={0} noOfLines={1}>
                {event.title}
              </Heading>
              {start.date === end.date ? (
                <Text maxH={14} fontSize="md" noOfLines={1}>
                  {start.date}
                  {", "}
                  {start.time}
                  {" - "}
                  {end.time}
                </Text>
              ) : (
                <Text maxH={14} fontSize="md" noOfLines={1} textAlign="left">
                  {start.date}
                  {", "}
                  {start.time}
                  {" - "}
                  {end.date}
                  {", "}
                  {end.time}
                </Text>
              )}
              <Stack>
                <Stack direction="row" spacing={1} pt={1.5}>
                  {eventCategories.map((category) => (
                    <Tag
                      key={category}
                      variant="outline"
                      colorScheme="purple"
                      size="md"
                      px={1.5}
                      py={0.5}
                      fontWeight={800}
                      borderRadius="full"
                      borderWidth="2px"
                      textTransform="capitalize"
                    >
                      {category.slice(0, 2)}
                    </Tag>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </Logger>
    );
  }, [event]);

  return smallCard;
};
