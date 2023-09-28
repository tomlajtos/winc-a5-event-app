import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const baseUrl = "http://localhost:3003";

export const loader = async ({ params }) => {
  console.log("event params:", params);

  const users = await fetch(`${baseUrl}/users`);
  const categories = await fetch(`${baseUrl}/categories`);
  const event = await fetch(`${baseUrl}/events/${params.eventId}`);

  return {
    users: await users.json(),
    categories: await categories.json(),
    event: await event.json(),
  };
};

export const EventPage = () => {
  const { users, event, categories } = useLoaderData();
  console.log("users:", users);
  console.log("categories:", categories);
  console.log("EVENT:", event);
  return <Heading>Event</Heading>;
};
