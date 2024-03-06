import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = {
  background: "gray.600",
  color: "white",
  _hover: { backgroundColor: "purple.800", color: "gray.50" },
  _active: { backgroundColor: "purple.900", color: "gray.50" },

  // dark mode, for future...
  _dark: {},
};
const base = defineStyle(baseStyle);

const permDel = defineStyle(
  Object.assign(
    { ...baseStyle },
    {
      color: "white",
      _hover: { backgroundColor: "gray.800", color: "white" },
      _active: { backgroundColor: "black", color: "white" },
      _dark: {},
    },
  ),
);

const cancel = defineStyle({
  // dark mode, for future...
  _dark: {},
});

const smRound = defineStyle(
  Object.assign(
    { ...baseStyle },
    {
      px: "0",
      mx: "0",
      h: "8",
    },
  ),
);

const mdRound = defineStyle(
  Object.assign(
    { ...baseStyle },
    {
      px: "0",
      h: "10",
    },
  ),
);

export const buttonTheme = defineStyleConfig({
  variants: { base, permDel, cancel, smRound, mdRound },
});
