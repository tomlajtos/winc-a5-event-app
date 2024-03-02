import { useMemo } from "react";
import { Link as RRLink } from "react-router-dom";
import { Stack, StackItem } from "@chakra-ui/react";
import { EventCardSmall } from "./EventCardSmall";
import { useSearchContext } from "../../../../context/SearchContext";
import { useStaticData } from "../../../../context/StaticDataContext";
import { useData } from "../../../../hooks/useData";

export const CompactEventList = ({ onClose }) => {
  const events = useData("events");
  const { categories } = useStaticData();
  const { searchValue } = useSearchContext();

  const searchResults = events
    ? events.filter(
        (e) =>
          searchValue.length > 0 &&
          e.title.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : null;

  const list = useMemo(() => {
    return searchResults?.length
      ? searchResults.map((event) => (
          <StackItem key={event.id}>
            <RRLink to={`event/${event.id}`} onClick={onClose}>
              <EventCardSmall event={event} categories={categories} />
            </RRLink>
          </StackItem>
        ))
      : null;
  }, [searchResults]);

  return list ? <Stack pt={6}>{list}</Stack> : null;
};
