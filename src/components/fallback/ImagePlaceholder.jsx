// Chakra-ui imports
import { Center, Text } from "@chakra-ui/react";

export const ImagePlaceholder = ({ ...props }) => {
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

  const text = props.text ? props.text : "No Image...";
  const fontSize = props.fontSize ? props.fontSize : ["lg", "xl", "2xl"];

  return (
    <Center
      height={height}
      width={width}
      p={4}
      bg="purple.800"
      color="teal.100"
      fontWeight="bold"
      fontSize={fontSize}
      {...props}
    >
      <Text textAlign="center" noOfLines={2}>
        {text}
      </Text>
    </Center>
  );
};
