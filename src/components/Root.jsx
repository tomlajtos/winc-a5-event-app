import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { RootContextProvider } from "../context/RootContext";

export const Root = () => {
  return (
    <RootContextProvider>
      <Box>
        <Navigation />
        <Outlet />
      </Box>
    </RootContextProvider>
  );
};
