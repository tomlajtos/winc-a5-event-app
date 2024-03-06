// Chakra-ui imports
import { Box, Heading } from "@chakra-ui/react";

export const PageTitle = ({ title, fixed, ...props }) => {
  const fontSize = props.fontSize
    ? props.fontSize
    : ["1.5rem", "1.75rem", "2rem"];
  const lineHeight = fontSize;
  const fixedProps = fixed
    ? {
        position: "sticky",
        top: 0,
        zIndex: "docked",
        borderBottom: "1px solid",
        height: ["40px", "52px", "64px"],
        borderBottomColor: "gray.300",
      }
    : {};

  return (
    <Box
      className="page-title-container"
      width="full"
      px={[2, 4, 6, 8, 10]}
      py={[2, 3, 4]}
      bg="inherit"
      {...fixedProps}
      {...props}
    >
      <Heading fontSize={fontSize} lineHeight={lineHeight} textAlign="left">
        {title}
      </Heading>
    </Box>
  );
};
