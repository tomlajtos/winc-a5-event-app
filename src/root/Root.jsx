// React and RRouter imports
import React, { useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
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

export const loader = async () => {
  const res = fetchData([{ name: "events", path: "/events" }]);
  return res;
};

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
// console.log("Users", users, "Categories", categories, "CategoryIds", categoryIds)

export const Root = () => {
  const { events } = useLoaderData();
  const [searchQ, setSearchQ] = useState("");
  const [filters, setFilters] = useState([...categoryIds]);
  const [rootSize, setRootSize] = useState({});

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
    <Box
      className="root-container"
      mx={0}
      px={0}
      b={8}
      h={"100vh"}
      background="gray.200"
      overflowY="hidden"
    >
      <Logger type="render" name="Root" color="white" bg="red" />
      <RootContext.Provider
        value={{
          categories,
          users,
          events,
          filters,
          setFilters,
          searchQ,
          setSearchQ,
          rootSize,
        }}
      >
        <AppHeader />
        <Box pt={0} backgroundColor="transparent" mx="auto">
          <Outlet />
        </Box>
      </RootContext.Provider>
    </Box>
  );
};