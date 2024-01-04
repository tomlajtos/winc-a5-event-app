import { useToast, Button } from "@chakra-ui/react";

export const SaveEditButton = ({ errors }, props) => {
  const toast = useToast();
  const variant = props.variant ? props.variant : "base";
  const size = props.size ? props.size : "lg";
  return (
    <Button
      type="submit"
      variant={variant}
      name="intent"
      value="edit"
      size={size}
      onClick={(e) => {
        if (errors.size > 0) {
          e.preventDefault();
          toast({
            title: "Editing is incomplete",
            description: "Please complete the required fields.",
            duration: 4000,
            position: "top",
            status: "error",
            isClosable: true,
          });
        }
      }}
      {...props}
    >
      Save
    </Button>
  );
};
