// React and RRouter imports
import React, { useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
// Chakra-ui imports
import { Box, Flex, Heading } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../context/RootContext";
// Component imports
import { Header } from "../components/Header";
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
    <Box
      className="root-container"
      mx={0}
      px={0}
      b={8}
      h={"100vh"}
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
        <Header />
        <Box pt={0} backgroundColor="transparent" mx="auto">
          <Outlet />
        </Box>
        {/* )} */}
      </RootContext.Provider>
    </Box>
  );
};
