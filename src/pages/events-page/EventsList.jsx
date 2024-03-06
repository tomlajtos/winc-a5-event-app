// React and React Router imports
import { useMemo } from "react";
import { Link } from "react-router-dom";
// Chakra-ui imports
import { Wrap } from "@chakra-ui/react";
// Context and custom hook imports
import { useFilterContext } from "../../context/FilterContext";
import { useSearchContext } from "../../context/SearchContext";
// Component imports
import { EventCard } from "./EventCard";

export const EventsList = ({ events }) => {
  const { filterEventsByCategories, categoryFilters } = useFilterContext();
  const { filterEventsBySearchValue } = useSearchContext();

  const filteredEvents = filterEventsByCategories(events, categoryFilters);
  const searchResults = filterEventsBySearchValue(filteredEvents);

  const list = useMemo(() => {
    return searchResults.map((event) => (
      <Link key={event.id} to={`event/${event.id}`}>
        <EventCard event={event} />
      </Link>
    ));
  }, [searchResults]);

  return searchResults.length > 0 ? (
    <Wrap
      direction="row"
      width="100%"
      justify="center"
      spacing={4}
      py={[4, 6, 6]}
      px={[0, 4, 4, null, 12]}
    >
      {list}
    </Wrap>
  ) : null;
};
