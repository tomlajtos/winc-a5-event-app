// React imports
import React from "react";
import ReactDOM from "react-dom/client";
// React Router imports
// Chakra-Ui imports
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/index";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
