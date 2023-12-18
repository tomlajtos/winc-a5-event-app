import { Link as RRLink } from "react-router-dom";
import { Stack, StackItem } from "@chakra-ui/react";
import { EventCardSmall } from "./EventCardSmall";
import { useData } from "../../../../hooks/useData";

export const CompactEventList = ({ searchQ, onClose, categories }) => {
  const events = useData("/events");

  const searchResults = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQ.toLowerCase()) &&
      searchQ.length > 0,
  );

  return (
    <Stack>
      {searchResults.map((event) => (
        <StackItem key={event.id}>
          <RRLink to={`/event/${event.id}`} onClick={onClose}>
            <EventCardSmall event={event} categories={categories} />
          </RRLink>
        </StackItem>
      ))}
    </Stack>
  );
};
