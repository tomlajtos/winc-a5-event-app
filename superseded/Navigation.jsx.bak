import React, { useContext } from "react";
import { Link as RRLink } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Checkbox,
  Heading,
  Stack,
} from "@chakra-ui/react";

import { RootContext } from "../context/RootContext";

export const Navigation = () => {
  const { categories, filterQ, setFilterQ } = useContext(RootContext);

  return (
    <Stack
      as={"nav"}
      direction={"column"}
      display={{ base: "none", md: "flex" }}
      p={2}
      spacing={3}
      minWidth={"250px"}
    >
      <Button
        as={RRLink}
        to={"/"}
        variant="ghost"
        pl={2}
        fontSize={"xl"}
        width={"full"}
        color="gray.900"
        sx={{ _hover: { backgroundColor: "gray.800", color: "gray.50" } }}
      >
        Events
      </Button>

      <Accordion allowMultiple>
        <AccordionItem>
          <Heading>
            <AccordionButton
              variant="ghost"
              rounded={"md"}
              h="40px"
              sx={{
                _hover: { backgroundColor: "gray.800", color: "gray.100" },
              }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize="lg"
                fontWeight="bolder"
              >
                Categories
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <Stack spacing={[1, 5]} direction="column">
              {categories.map((category) => (
                <Checkbox
                  id={category.id}
                  key={category.id}
                  name="categoryIds"
                  isChecked={filterQ.includes(category.id)}
                  value={category.id}
                  colorScheme="purple"
                  onChange={(e) => {
                    // TODO: move to utils, add jsDOC comments
                    const handleFilterChange = (
                      filters,
                      filterInput,
                      setFn
                    ) => {
                      let newFilters = [...filters];
                      console.log(
                        "%c onChange NAV > filter",
                        "color:red;background:white"
                      );
                      console.log("newFilters before", newFilters);
                      if (e.target.checked) {
                        newFilters = Array.from(
                          new Set([Number(filterInput.value), ...newFilters])
                        );
                      } else {
                        newFilters = newFilters.filter(
                          (q) => q !== Number(filterInput.value)
                        );
                      }
                      console.log("newFilters after", newFilters);
                      setFn(newFilters);
                    };
                    handleFilterChange(filterQ, e.target, setFilterQ);
                  }}
                >
                  {category.name}
                </Checkbox>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Button
        as={RRLink}
        to={"/event/new"}
        variant={"solid"}
        pl={2}
        width={"full"}
        fontSize={"xl"}
        backgroundColor="gray.600"
        color="gray.50"
        sx={{ _hover: { backgroundColor: "gray.800", color: "gray.50" } }}
      >
        Create new
      </Button>
    </Stack>
  );
};
