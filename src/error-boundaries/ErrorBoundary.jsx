import { useRouteError /*, isRouteErrorResponse*/ } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { ErrorUi } from "./ErrorUi";
import { log } from "../util/log";

export const ErrorBoundary = () => {
  const error = useRouteError();
  log.value("error @ ErrorBoundary", error);
  return (
    <Box
      className="error-boundary-container"
      width="100%"
      maxW="1280px"
      marginX="auto"
      bg="blackAlpha.700"
      pt="10%"
      color="white"
      flex={"1"}
    >
      <ErrorUi error={error} />;
    </Box>
  );
};
