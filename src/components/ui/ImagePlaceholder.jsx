import { Center, Text } from "@chakra-ui/react";

export const ImagePlaceholder = ({ ...props }) => {
  const size = props.size ? props.size : "206px";
  const text = props.text ? props.text : "Event";
  const fontSize = props.fontSize ? props.fontSize : "2xl";
  return (
    <Center
      boxSize={size}
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
