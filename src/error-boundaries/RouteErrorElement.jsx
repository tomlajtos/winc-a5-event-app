// React and React Router imports
import { useRouteError } from "react-router-dom";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Component imports
import { ErrorUi } from "./ErrorUi";
// Util and I/O imports
import { log } from "../util/log";

export const RouteErrorElement = () => {
  const error = useRouteError();
  log.error(error);

  return (
    <Box
      className="error-element-container"
      width="100%"
      maxW="1280px"
      marginX="auto"
      bg="blackAlpha.700"
      color="white"
      flex={"1"}
    >
      <ErrorUi error={error} />
    </Box>
  );
};
