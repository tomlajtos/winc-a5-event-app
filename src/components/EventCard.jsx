import { Heading } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  StackDivider,
  Text,
  Tag,
} from "@chakra-ui/react";
import { useRoot } from "../context/RootContext.jsx";
import { formatDateAndTime } from "../util/globalFunctions.js";
import placeholderImgUrl from "../assets/eventImgPlaceholder_300.svg";

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
      <Image
        maxW={"40%"}
        objectFit={"cover"}
        src={event.image}
        fallbackSrc={placeholderImgUrl}
      />
      <Stack>
        <CardBody pt={0} pb={2}>
          <Heading size={"lg"}>{event.title}</Heading>
          <Stack pt={4} spacing={1}>
            <Text pb={0}>
              <Text as="span" fontWeight={"bolder"}>
                {"Start: "}
              </Text>
              <Text as="span">{`${start.shortDate} at `}</Text>
              <Text as="span" fontWeight={"bolder"}>
                {start.time}
              </Text>
            </Text>
            <Text>
              <Text as="span" fontWeight={"bolder"}>
                {"End: "}
              </Text>
              <Text as="span">{`${end.shortDate} at `}</Text>
              <Text as="span" fontWeight={"bolder"}>
                {end.time}
              </Text>
            </Text>
            <Text pt={3} pb={2}>
              {event.description}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter align={"start"} py={2}>
          <Stack direction={"row"} spacing={2} pt={1}>
            {eventCategories.map((category) => (
              <Tag key={category} colorScheme={"purple"}>
                {category}
              </Tag>
            ))}
          </Stack>
        </CardFooter>
      </Stack>
    </Card>
  );
};
