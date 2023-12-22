// React and RRouter imports
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../context/RootContext";
// Component imports
import { AppHeader } from "./app-header/AppHeader";
// utils imports
import { fetchData } from "../util/fetch.js";
import { createCategoryIdsArr } from "../util/inputUtils.js";
import { Logger } from "../util/Logger.jsx";

// fetch static data separately from loader
const staticData = await fetchData([
  { name: "categories", path: "/categories" },
  { name: "users", path: "/users" },
]);

const {
  categories,
  users,
  categoryIds = createCategoryIdsArr(categories),
} = staticData;

export const Root = () => {
  const [searchQ, setSearchQ] = useState("");
  const [filters, setFilters] = useState([...categoryIds]);
  const [rootSize, setRootSize] = useState({});
  const [windowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // get .root-container size dynamically
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entry) => {
      if (entry[0].borderBoxSize) {
        setRootSize({
          width: Math.round(entry[0].borderBoxSize[0].inlineSize),
          height: Math.round(entry[0].borderBoxSize[0].blockSize),
        });
      } else if (entry[0].contentRect) {
        setRootSize({
          width: Math.round(entry[0].contentRect.width),
          height: Math.round(entry[0].contentRect.height),
        });
      }
    });
    resizeObserver.observe(document.querySelector("div"));
  }, []);

  return (
    <Box className="root-container" mx={0} px={0} b={8} background="gray.200">
      <Logger type="render" name="Root" color="white" bg="red" />
      <RootContext.Provider
        value={{
          categories,
          users,
          filters,
          setFilters,
          searchQ,
          setSearchQ,
          rootSize,
          windowSize,
        }}
        minH="100vh"
      >
        <AppHeader />
        <Box pt={0} backgroundColor="transparent" mx="auto">
          <Outlet />
        </Box>
      </RootContext.Provider>
    </Box>
  );
};
