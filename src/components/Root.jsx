// React and RRouter imports
import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
// Chakra-ui imports
import { Box, Flex, Heading, Stack, StackDivider } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../context/RootContext";
// Component imports
import { Navigation } from "./Navigation";
import { Search } from "../components/Search";
// utils imports
import { fetchData, initCategoryIdsArr } from "../util/globalFunctions";

export const loader = async () => {
  const res = fetchData([
    { name: "categories", path: "/categories" },
    { name: "users", path: "/users" },
  ]);
  return res;
};

export const Root = () => {
  const { categories, users } = useLoaderData();
  const categoryIds = initCategoryIdsArr(categories);
  const [searchQ, setSearchQ] = useState("");
  const [filterQ, setFilterQ] = useState([...categoryIds]);

  return (
    <Flex direction={"column"} bg={"gray.300"} minH={"100vh"}>
      <RootContext.Provider
        value={{ categories, users, filterQ, setFilterQ, searchQ, setSearchQ }}
      >
        <Stack direction={"row"} minH={"6vh"}>
          <Heading size={"lg"} textAlign={"center"} p={4}>
            Event App
          </Heading>
          <Search />
        </Stack>
        <Stack
          pt={2}
          backgroundColor={"white"}
          direction={"row"}
          flex={"1"}
          divider={
            <StackDivider orientation={"column"} borderColor={"gray.300"} />
          }
        >
          <Navigation />
          <Box flex={1}>
            <Outlet />
          </Box>
        </Stack>
      </RootContext.Provider>
    </Flex>
  );
};
