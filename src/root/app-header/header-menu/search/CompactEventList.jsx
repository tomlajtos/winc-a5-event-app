import { Link as RRLink, useRouteLoaderData } from "react-router-dom";
import { Stack, StackItem } from "@chakra-ui/react";
import { EventCardSmall } from "./EventCardSmall";
import { useData } from "../../../../hooks/useData";
import { useSearchQuery } from "../../../../context/SearchContext";
import { Logger } from "../../../../util/Logger";

export const CompactEventList = ({ onClose }) => {
  const events = useData("/events");
  const { categories } = useRouteLoaderData("root");
  const { searchQ } = useSearchQuery();

  const searchResults = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQ.toLowerCase()) &&
      searchQ.length > 0,
  );

  return searchQ.length > 0 ? (
    <Stack>
      <Logger
        type="render"
        target="component"
        name="compact-event-list"
        level={5}
      />
      {searchResults.map((event) => (
        <StackItem key={event.id}>
          <RRLink to={`/event/${event.id}`} onClick={onClose}>
            <EventCardSmall event={event} categories={categories} />
          </RRLink>
        </StackItem>
      ))}
    </Stack>
  ) : null;
};
