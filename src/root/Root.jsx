// React and React Router imports
import { Outlet } from "react-router-dom";
// Chakra-ui imports
import { Box, Center } from "@chakra-ui/react";
// Component imports
import { AppHeader } from "./app-header/AppHeader";

export const Root = () => {
  return (
    <Box
      className="root-container"
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      background="gray.200"
    >
      <AppHeader />

      <Box
        className="root-outlet-container"
        display="flex"
        pt={0}
        backgroundColor="transparent"
        flex="1"
        overflowY="hidden"
      >
        <Outlet />
      </Box>

      {/*App footer*/}
      <Center
        bg="gray.800"
        color="purple.500"
        height={[6, 8, 10]}
        fontSize={["2xs", "xs", "sm"]}
      >
        React Advanced Assignment 2024
      </Center>
    </Box>
  );
};
