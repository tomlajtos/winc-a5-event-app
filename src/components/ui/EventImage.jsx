// React and React Router imports
import { useMemo } from "react";
// Chakra-ui imports
import { Image } from "@chakra-ui/react";
// Component imports
import { ImagePlaceholder } from "../fallback/ImagePlaceholder";

export const EventImage = ({ event, ...props }) => {
  const height = props.height
    ? props.height
    : props.size
      ? props.size
      : ["200px", null, "300px"];

  const width = props.width
    ? props.width
    : props.size
      ? props.size
      : ["full", null, "300px"];

  const eventImage = useMemo(() => {
    return event.image ? (
      <Image
        src={event.image}
        height={height}
        width={width}
        objectFit="cover"
        {...props}
      />
    ) : (
      <ImagePlaceholder
        height={height}
        width={width}
        text="No Image..."
        {...props}
      />
    );
  }, [event.image]);

  return eventImage;
};
