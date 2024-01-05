import { useRouteError } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { ErrorUi } from "./ErrorUi";
import { pretifyError } from "../util/error";

export const ErrorBoundary = () => {
  const error = useRouteError();
  const prettyError = pretifyError(error);
  return (
    <Box
      className="event-page-container"
      width="100%"
      maxW="1280px"
      marginX="auto"
      bg="gray.900"
      pt="10%"
      flexGrow="1"
    >
      <ErrorUi error={prettyError} />;
    </Box>
  );
};
