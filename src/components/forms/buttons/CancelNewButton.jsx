// React and React Router imports
// Chakra-ui imports
// Context and custom hook imports
// Component imports
// Error component imports
// Util and I/O imports
// Assets imports

// React and React Router imports
import { Link } from "react-router-dom";
// Chakra-ui imports
import { IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const CancelNewButton = (props) => {
  return (
    <IconButton
      as={Link}
      to="/"
      aria-label="Close event"
      icon={<CloseIcon fontSize={["8px", "12px"]} />}
      variant={["smRound", "mdRound"]}
      justifySelf="flex-start"
      isRound
      {...props}
    />
  );
};
