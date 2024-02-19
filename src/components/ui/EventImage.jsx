import { useMemo } from "react";
import { Box, Image } from "@chakra-ui/react";
import { ImagePlaceholder } from "./ImagePlaceholder";

export const EventImage = ({ event, ...props }) => {
  const size = props.size ? props.size : "206px";
  const rounded = props.rounded ? props.rounded : "";

  const eventImage = useMemo(() => {
    return (
      <Box>
        {event.image ? (
          <Image
            src={event.image}
            boxSize={size}
            objectFit="cover"
            rounded={rounded}
          />
        ) : (
          <ImagePlaceholder
            boxSize={size}
            rounded={rounded}
            text={event.title}
          />
        )}
      </Box>
    );
  }, [event.image]);

  return eventImage;
};
