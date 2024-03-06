// React and React Router imports
import { useMemo } from "react";
// Chakra-ui imports
import { Text } from "@chakra-ui/react";
// Util and I/O imports
import { formatDateAndTime } from "../util/datetime";

export const EventDates = ({ event, ...props }) => {
  const start = useMemo(
    () => formatDateAndTime(event.startTime),
    [event.startTime],
  );
  const end = useMemo(() => formatDateAndTime(event.endTime), [event.endTime]);

  const fontSize = props.fontSize ? props.fontSize : ["lg", "xl", "2xl"];

  return start.date === end.date ? (
    <Text fontSize={fontSize} {...props}>
      {start.date}
      {", "}
      {start.time} &ndash; {end.time}
    </Text>
  ) : (
    <Text fontSize={fontSize} {...props}>
      {start.date}
      {", "}
      {start.time} &ndash; {end.date}
      {", "}
      {end.time}
    </Text>
  );
};
