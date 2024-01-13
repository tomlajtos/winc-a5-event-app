import { extendTheme } from "@chakra-ui/react";
// global style overrides
import { styles } from "./styles";
// component style overrides
import { buttonTheme } from "./components/button";

const overrides = {
  styles,
  components: {
    Button: buttonTheme,
  },
};

export const theme = extendTheme(overrides);
