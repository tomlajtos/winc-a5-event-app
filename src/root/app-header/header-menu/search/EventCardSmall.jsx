import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  Tag,
} from "@chakra-ui/react";
import { useStaticData } from "../../../../context/StaticDataContext.jsx";
import { formatDateAndTime } from "../../../../util/datetime.js";
import placeholderImgUrl from "../../../../assets/eventImgPlaceholder_300.svg";
import { Logger } from "../../../../util/Logger.jsx";

export const EventCardSmall = ({ event }) => {
  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);
  const { categories } = useStaticData();
  const eventCategories = categories
    .filter((category) => event.categoryIds.includes(category.id))
    .map((cat) => ` ${cat.name}`);

  eventCategories.map((c) => console.log("cat", c.slice(0, 2)));
  return (
    <Card
      direction="row"
      overflow="hidden"
      height="100px"
      width={["350px"]}
      textAlign="left"
    >
      <Logger
        type="render"
        target="component"
        name="EventCardSmall"
        level={5}
      />
      <Image
        boxSize="100px"
        objectFit="cover"
        src={event.image}
        fallbackSrc={placeholderImgUrl}
      />
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
  );
};
