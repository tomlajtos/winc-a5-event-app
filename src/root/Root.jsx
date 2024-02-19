// React and RRouter imports
import { Outlet } from "react-router-dom";
// Context imports
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Component imports
import { AppHeader } from "./app-header/AppHeader";
// utils and i/o imports
import { Logger } from "../util/Logger";

export const Root = () => {
  return (
    <Logger name="root" type="root">
      <Box
        className="root-container"
        width="100%"
        height="100vh"
        display="flex"
        flexDirection="column"
        mx={0}
        px={0}
        background="gray.200"
      >
        <AppHeader />

        <Box
          className="root-outlet container"
          display="flex"
          pt={0}
          backgroundColor="transparent"
          height={`${window.innerHeight - 95}px`}
          flex="1"
          overflowY="hidden"
        >
          <Outlet />
        </Box>
      </Box>
    </Logger>
  );
};
