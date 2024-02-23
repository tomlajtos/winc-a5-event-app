// TODO: not catching response errors, find solution, fetch function should expose error...

import React from "react";
import { Box } from "@chakra-ui/react";
import { ErrorUi } from "./ErrorUi";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box flex="1" pt="10%" bg="">
          <ErrorUi error={this.state.error} />;
        </Box>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
