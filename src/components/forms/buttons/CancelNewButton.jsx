import { Link as RRLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";
export const CancelNewButton = (props) => {
  const variant = props.variant ? props.variant : "base";
  const size = props.size ? props.size : "lg";
  return (
    <Button
      as={RRLink}
      to="/"
      variant={variant}
      size={size}
      colorScheme="red"
      {...props}
    >
      Cancel
    </Button>
  );
};
