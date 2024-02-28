import { Link as RRLink, useRouteLoaderData } from "react-router-dom";
import { Stack, StackItem } from "@chakra-ui/react";
import { EventCardSmall } from "./EventCardSmall";
import { useSearchContext } from "../../../../context/SearchContext";
import { useStaticData } from "../../../../context/StaticDataContext";
import { useData } from "../../../../hooks/useData";
import { Logger } from "../../../../util/Logger";

export const CompactEventList = ({ onClose }) => {
  const events = useData("events");
  const { categories } = useStaticData();
  const { searchValue } = useSearchContext();

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
