import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { RootContextProvider } from "../context/RootContext";

export const Root = () => {
  return (
    <RootContextProvider>
      <Box bg={"gray.100"}>
        <Navigation />
        <Outlet />
      </Box>
    </RootContextProvider>
  );
};
