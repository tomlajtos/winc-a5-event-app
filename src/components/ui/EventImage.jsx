// React and React Router imports
import { useMemo, useState } from "react";
// Chakra-ui imports
import { Image } from "@chakra-ui/react";
// Component imports
import { ImagePlaceholder } from "../fallback/ImagePlaceholder";

export const EventImage = ({ event, ...props }) => {
  const [imageStatus, setImageStatus] = useState(null);

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

  const placeHolderText = !imageStatus
    ? "No image..."
    : imageStatus === "error"
      ? "Cannot load image..."
      : "Loading...";

  const eventImage = useMemo(() => {
    return (
      <Image
        src={event.image}
        height={height}
        width={width}
        objectFit="cover"
        onError={() => setImageStatus("error")}
        onLoad={() => setImageStatus("loaded")}
        {...props}
      />
    );
  }, [event.image, imageStatus]);

  return event.image && imageStatus !== "error" ? (
    eventImage
  ) : (
    <ImagePlaceholder
      height={height}
      width={width}
      text={placeHolderText}
      {...props}
    />
  );
};
