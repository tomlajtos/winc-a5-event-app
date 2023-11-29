// React and RRouter imports
import React, { useState, useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Context imports
import { RootContext } from "../context/RootContext";
// Component imports
import { Header } from "../components/Header";
// utils imports
import { fetchData, initCategoryIdsArr } from "../util/globalFunctions";
import { log } from "../util/log";

export const loader = async () => {
  const res = fetchData([
    { name: "categories", path: "/categories" },
    { name: "users", path: "/users" },
    { name: "events", path: "/events" },
  ]);
  return res;
};

export const Root = () => {
  const { categories, users, events } = useLoaderData();
  const categoryIds = initCategoryIdsArr(categories);
  const [searchQ, setSearchQ] = useState("");
  const [filterQ, setFilterQ] = useState([...categoryIds]);
  const [rootSize, setRootSize] = useState({});
  log.comp("Root", "red", "white");
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
      <RootContext.Provider
        value={{
          categories,
          users,
          events,
          filterQ,
          setFilterQ,
          searchQ,
          setSearchQ,
          rootSize,
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
