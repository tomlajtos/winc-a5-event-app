// React and React Router imports
import { useMemo } from "react";
// chakra-ui imports
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
//components
import { EventCategories } from "../../components/EventCategories";
import { EventDates } from "../../components/EventDates";
import { EventImage } from "../../components/ui/EventImage.jsx";

export const EventCard = ({ event }) => {
  const card = useMemo(() => {
    return (
      <Card
        width={["95vw", null, "lg"]}
        maxW={["95vw", "md", "lg"]}
        height={["330px", null, "232px"]}
        pt={[0, null, 3]}
        pb={[3.5, 4, 3]}
        px={[0, null, 3]}
        direction={["column", null, "row"]}
        gap={[1.5, 0.5, 3]}
        variant="outline"
        overflow="hidden"
        background="gray.50"
        borderColor="purple.100"
      >
        <EventImage
          event={event}
          height={["160px", "180px", "206px"]}
          width={["full", null, "206px"]}
          rounded={[null, null, "md"]}
        />

        <Stack flex={1} spacing={2} px={[2, null, 0]}>
          <CardBody as={Stack} direction="column" spacing={[0, null, 1]} p={0}>
            <Heading size="lg" noOfLines={1}>
              {event.title}
            </Heading>

            <Stack spacing={[2, null, 4]} w="full">
              <EventDates event={event} fontSize={["md", "lg"]} />

              <Text
                noOfLines={[1, null, 2]}
                color="gray.700"
                fontSize={["sm", "md"]}
              >
                {event.description}
              </Text>
            </Stack>
          </CardBody>

          <CardFooter align="start" p={0}>
            <EventCategories
              event={event}
              tagProps={{ size: ["sm", "md"], px: 3, py: 1.5 }}
            />
          </CardFooter>
        </Stack>
      </Card>
    );
  }, [event]);

  return card;
};
