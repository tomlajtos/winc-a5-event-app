// React and RRouter imports
import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
// Chakra-ui imports
import { Box, Flex, Heading } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../context/RootContext";
// Component imports
// import { Navigation } from "./Navigation";
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
  const [headerHeight, setHeaderHeight] = useState(0);
  const header = useRef();

  useEffect(() => {
    if (header.current) {
      setHeaderHeight(header.current.offsetHeight);
    }
    const setHeightOnResize = () => {
      setHeaderHeight(header.current.offsetHeight);
    };
    window.onresize = setHeightOnResize;
  }, [headerHeight]);

  return (
    <Flex
      direction={"column"}
      minH={"100vh"}
      margin="auto"
      background="gray.200"
      alignItems="center"
      pb={8}
    >
      <RootContext.Provider
        value={{
          categories,
          users,
          filterQ,
          setFilterQ,
          searchQ,
          setSearchQ,
          headerHeight,
        }}
      >
        <Flex
          as="header"
          ref={header}
          width="full"
          px={[2, 4, 8, null, 12]}
          py={6}
          position="sticky"
          top={0}
          zIndex="sticky"
          wrap="wrap"
          direction={["column", null, "row"]}
          gap={2}
          background="gray.800"
          minH={"6vh"}
          align="center"
          onMouseOver={(e) => console.log(e)}
        >
          <Flex
            direction={["column", null, "row"]}
            flex={1}
            justify="space-between"
          >
            <Heading
              as="h1"
              // NOTE: if lineH. is not def, it will change on on sm/md breakpoint for some reason
              // lineHeight="3rem"
              fontSize="3rem"
              width="fit-content"
              color="purple.200"
              fontWeight="light"
              fontFamily="mono"
              pr={8}
              pl={[8, null, 0]}
            >
              EventApp
            </Heading>
            <Search />
          </Flex>
          <Navigation />
        </Flex>
        {headerHeight && (
          <Box pt={0} backgroundColor="transparent" mx="auto">
            <Outlet />
          </Box>
        )}
      </RootContext.Provider>
    </Flex>
  );
};
