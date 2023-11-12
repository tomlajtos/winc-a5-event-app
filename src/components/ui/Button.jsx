import { Button as CButton } from "@chakra-ui/react";

export const Button = ({ text, isPermDel, ...props }) => {
  const hoverStyle = isPermDel
    ? { backgroundColor: "#000", color: "#fff" }
    : { backgroundColor: "purple.800", color: "gray.50" };
  return (
    <CButton
      size={"md"}
      bg="gray.600"
      color="gray.50"
      sx={{
        _hover: hoverStyle,
        _active: { backgroundColor: "purple.900", color: "gray.50" },
      }}
      {...props}
    >
      {text}
    </CButton>
  );
};
