import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

const baseUrl = "http://localhost:3003";

export const loader = async () => {
  const users = await fetch(`${baseUrl}/users`);
  const events = await fetch(`${baseUrl}/events`);
  const categories = await fetch(`${baseUrl}/categories`);

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventsPage = () => {
  const { users, events, categories } = useLoaderData();
  console.log("users:", users);
  console.log("events:", events);
  console.log("categories:", categories);

  return <Heading>List of events</Heading>;
};
