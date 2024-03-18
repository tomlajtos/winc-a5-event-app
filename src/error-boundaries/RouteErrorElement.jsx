// React and Ract Router imports
import { useRouteError } from "react-router-dom";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Error component imports
import { ErrorUi } from "./ErrorUi";
// Util and I/O imports
import { addBetterErrorProps } from "../util/error";

export const RouteErrorElement = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      className="error-element-container"
      width="100%"
      maxW="1280px"
      marginX="auto"
      bg="blackAlpha.700"
      color="white"
      flex="1"
    >
      <ErrorUi error={addBetterErrorProps(error)} />
    </Box>
  );
};
