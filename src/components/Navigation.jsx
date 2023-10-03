import React from "react";
import { Link as RRLink } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Tabs as={"nav"} pb={8}>
      <TabList>
        <Tab as={RRLink} to={"/"}>
          Events
        </Tab>
        <Tab as={RRLink} to={"/event/1"}>
          Event
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Events Panel</TabPanel>
        <TabPanel>Event Panel</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
