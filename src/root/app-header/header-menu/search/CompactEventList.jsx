// React and React Router imports
import { useMemo } from "react";
import { Link } from "react-router-dom";
// Chakra-ui imports
import { Box, Stack, StackItem } from "@chakra-ui/react";
// Context and custom hook imports
import { useData } from "../../../../hooks/useData";
import { useSearchContext } from "../../../../context/SearchContext";
import { useStaticData } from "../../../../context/StaticDataContext";
// Component imports
import { CompactCategories } from "./CompactCategories";
import { EventCardSmall } from "./EventCardSmall";

export const CompactEventList = ({ onClose }) => {
  const events = useData("events");
  const { categories } = useStaticData();
  const { searchValue } = useSearchContext();

  const categoryNames = categories
    .map((category) => category.name)
    .sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

  const searchResults = events
    ? events.filter(
        (e) =>
          searchValue.length > 0 &&
          e.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : null;

  const list = useMemo(() => {
    if (searchResults?.length) {
      return (
        <Stack direction="column" spacing={2}>
          <Box
            width="fit-content"
            mx="auto"
            mb={2}
            bg="blackAlpha.400"
            py={1}
            pl={3}
            pr={4}
            rounded="2xl"
          >
            <CompactCategories
              categories={categoryNames}
              colors="neonVioLight"
              gap={4}
              aria-label="Category tag explanation for small event cards"
              full
            />
          </Box>
          {searchResults.map((event) => (
            <StackItem key={event.id}>
              <Link to={`event/${event.id}`} onClick={onClose}>
                <EventCardSmall event={event} categories={categories} />
              </Link>
            </StackItem>
          ))}
        </Stack>
      );
    }
    return null;
  }, [searchResults]);

  return list ? <Stack pt={4}>{list}</Stack> : null;
};
