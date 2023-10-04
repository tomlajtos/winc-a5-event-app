import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { RootContextProvider } from "../context/RootContext";
import { Search } from "../components/Search";

export const Root = () => {
  return (
    <RootContextProvider>
      <Box bg={"gray.100"} minH={"100vh"}>
        <Stack direction={"row"} backgroundColor={"blue.300"}>
          <Heading size={"md"} textAlign={"center"} p={4}>
            Event App
          </Heading>
          <Search />
        </Stack>
        <Navigation />
        <Outlet />
      </Box>
    </RootContextProvider>
  );
};
