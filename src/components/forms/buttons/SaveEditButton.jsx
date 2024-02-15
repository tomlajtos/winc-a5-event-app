import { Button } from "@chakra-ui/react";

export const SaveEditButton = (props) => {
  const variant = props.variant ? props.variant : "base";
  const size = props.size ? props.size : "lg";

  return (
    <Button
      type="submit"
      variant={variant}
      name="intent"
      value="edit"
      size={size}
      {...props}
    >
      Save
    </Button>
  );
};
