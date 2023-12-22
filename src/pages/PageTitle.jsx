import { Flex, Heading } from "@chakra-ui/react";

export const PageTitle = ({ title, ...props }) => {
  const fontSize = props.fontSize ? props.fontSize : "2rem";
  const lineHeight = fontSize;

  return (
    <Flex
      direction="row"
      height="65px"
      px={[4, 6, 8, 10]}
      bg="inherit"
      py={3}
      zIndex="docked"
      borderBottom="1px solid"
      borderColor="gray.200"
      {...props}
    >
      <Heading
        p={0}
        m={0}
        fontSize={fontSize}
        lineHeight={lineHeight}
        height="fit-content"
        alignSelf="center"
      >
        {title}
      </Heading>
    </Flex>
  );
};
