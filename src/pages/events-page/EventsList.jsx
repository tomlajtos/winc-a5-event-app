// React imports
import { useMemo } from "react";
// React Router imports
import { Link as RRLink } from "react-router-dom";
// ChakraUi imports
import { Wrap } from "@chakra-ui/react";
// Context and custom hook imports
import { useSearchContext } from "../../context/SearchContext";
import { useFilterContext } from "../../context/FilterContext";
// App component imports
import { EventCard } from "./EventCard";
// Util imports
import { Logger } from "../../util/Logger";

export const EventsList = ({ events }) => {
  const { filterEventsByCategories, categoryFilters } = useFilterContext();
  const { filterEventsBySearchValue } = useSearchContext();

  const filteredEvents = filterEventsByCategories(events, categoryFilters);
  const searchResults = filterEventsBySearchValue(filteredEvents);

  const list = useMemo(() => {
    return searchResults.map((event) => (
      <RRLink key={event.id} to={`event/${event.id}`}>
        <EventCard event={event} />
      </RRLink>
    ));
  }, [searchResults]);

  return searchResults.length > 0 ? (
    <Logger name="EventsList" level={5}>
      <Wrap
        direction={"row"}
        width="100%"
        justify="center"
        spacing={4}
        py={6}
        px={[2, 4, 4, null, 12]}
      >
        {list}
      </Wrap>
    </Logger>
  ) : null;
};
