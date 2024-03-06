// Chakra-ui imports
import { Button } from "@chakra-ui/react";

export const CancelEditButton = ({ onClick, ...props }) => {
  const variant = props.variant ? props.variant : "base";
  const size = props.size ? props.size : ["sm", "md", "lg"];

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      colorScheme="red"
      onClick={onClick}
      {...props}
    >
      Cancel
    </Button>
  );
};
