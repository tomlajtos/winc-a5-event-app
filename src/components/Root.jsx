import React, { useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Navigation } from "./Navigation";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
// import { RootContextProvider } from "../context/RootContext";
import { RootContext } from "../context/RootContext";
import { Search } from "../components/Search";
import {
  fetchData,
  initCheckedItemMap,
  createCheckedIdsArr,
} from "../util/globalFunctions";

export const loader = async () => {
  // console.log("ROOT");
  const res = fetchData([
    { name: "categories", path: "/categories" },
    { name: "users", path: "/users" },
  ]);
  // console.log("rootLoader-res:", await res);
  return res;
};

export const Root = () => {
  const { categories, users } = useLoaderData();
  // console.log(
  //   "useLD:",
  //   useLoaderData(),
  //   "\n > cat:",
  //   categories,
  //   "\n > users:",
  //   users,
  // );

  // states for context
  const [checkedFilters, setCheckedFilters] = useState(
    new Map(initCheckedItemMap(categories, true)),
  );
  const [searchQ, setSearchQ] = useState("");
  const [filterQ, setFilterQ] = useState(createCheckedIdsArr(checkedFilters));

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
