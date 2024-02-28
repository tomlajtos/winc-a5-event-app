import { Box, Text } from "@chakra-ui/react";
import { formatDateAndTime } from "../../util/datetime";
import { Logger } from "../../util/Logger";

export const EventDates = ({ event }) => {
  const start = formatDateAndTime(event.startTime);
  const end = formatDateAndTime(event.endTime);

  return start.date === end.date ? (
    <Logger name="EventDates" level={5}>
      <Box py={1} maxH={14} alignSelf="start">
        <Text fontSize="2xl">
          {start.date}
          {", "}
          {start.time}
          {" - "}
          {end.time}
        </Text>
      </Box>
    </Logger>
  ) : (
    <Logger name="EventDates(day+)" level={5}>
      <Box py={1} maxH={14} alignSelf="start">
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
    </Logger>
  );
};
