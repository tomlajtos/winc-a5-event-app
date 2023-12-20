// React and RRouter imports
import React from "react";
import { Link as RRLink } from "react-router-dom";
// Chakra-ui imports
import { Heading } from "@chakra-ui/react";
// Context imports
// Component imports
// Util imports
// import { Logger } from "../../util/Logger";

export const AppTitle = ({ title }) => {
  return (
    <RRLink to="/">
      <Heading
        as="h1"
        // NOTE: if lineH. is not def, Chakra-ui will change it on the sm/md breakpoint > causing shift-glitch
        lineHeight={1}
        fontSize={["2.5rem", null, "3rem"]}
        width="fit-content"
        color="purple.200"
        fontWeight="light"
        fontFamily="mono"
        flex={1}
      >
        {title}
      </Heading>
    </RRLink>
  );
};
