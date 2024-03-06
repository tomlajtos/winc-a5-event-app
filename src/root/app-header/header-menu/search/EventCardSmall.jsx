// React and React Router imports
import { useMemo } from "react";
// Chakra-ui imports
import { Card, CardBody, Heading, Stack } from "@chakra-ui/react";
// Context and custom hook imports
import { useStaticData } from "../../../../context/StaticDataContext";
// Component imports
import { CompactCategories } from "./CompactCategories";
import { EventDates } from "../../../../components/EventDates";
import { EventImage } from "../../../../components/ui/EventImage";

export const EventCardSmall = ({ event }) => {
  const { categories } = useStaticData();

  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => cat.name);

  const smallCard = useMemo(() => {
    return (
      <Card
        direction="row"
        overflow="hidden"
        height="100px"
        width={["284px", "350px"]}
        textAlign="left"
      >
        <EventImage event={event} size={100} />

        <CardBody fontSize="1rem" px={2} py={2}>
          <Stack flex={1} spacing={1.5} m={0} py={0}>
            <Heading size="md" py={0} m={0} noOfLines={1}>
              {event.title}
            </Heading>

            <EventDates event={event} fontSize="md" noOfLines={1} />

            <CompactCategories categories={eventCategories} colors="neonVio" />
          </Stack>
        </CardBody>
      </Card>
    );
  }, [event]);

  return smallCard;
};
