import { Link } from "react-router-dom";
import { Button, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
export const CancelNewButton = (props) => {
  // const variant = props.variant ? props.variant : "base";
  // const size = props.size ? props.size : ["sm", "md", "lg"];
  // return (
  //   <Button
  //     as={Link}
  //     to="/"
  //     variant={variant}
  //     size={size}
  //     colorScheme="red"
  //     {...props}
  //   >
  //     Cancel
  //   </Button>
  // );
  return (
    <IconButton
      as={Link}
      to="/"
      aria-label="Close event"
      icon={<CloseIcon fontSize={["8px", "12px"]} />}
      variant={["smRound", "mdRound"]}
      justifySelf="flex-start"
      isRound
    />
  );
};
