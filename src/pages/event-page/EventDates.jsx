import { Box, Text } from "@chakra-ui/react";
import { formatDateAndTime } from "../../util/datetime";
import { Logger } from "../../util/Logger";

export const EventDates = ({ event }) => {
  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);
  return start.date === end.date ? (
    <Box py={1} maxH={14} alignSelf="start">
      <Logger
        type="render"
        target="component"
        name="EventDate 1day"
        level={4}
      />
      <Text fontSize="2xl">
        {start.date}
        {", "}
        {start.time}
        {" - "}
        {end.time}
      </Text>
    </Box>
  ) : (
    <Box py={1} maxH={14} alignSelf="start">
      <Logger
        type="render"
        target="component"
        name="EventDate multi day"
        level={4}
      />
      <Text fontSize="lg">
        {start.date}
        {", "}
        {start.time}
        {" - "}
        {end.date}
        {", "}
        {end.time}
      </Text>
    </Box>
  );
};
