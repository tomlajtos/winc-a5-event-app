import { extendTheme } from "@chakra-ui/react";
// global style overrides
import { styles } from "./styles";
// component style overrides
import { buttonTheme } from "./components/button";
import { checkboxTheme } from "./components/checkbox";

const overrides = {
  styles,
  components: {
    Button: buttonTheme,
    Checkbox: checkboxTheme,
  },
};

export const theme = extendTheme(overrides);
