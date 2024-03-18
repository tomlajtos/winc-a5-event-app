// React and React Router imports
import React from "react";
// Chakra-ui imports
import { Box } from "@chakra-ui/react";
// Error component imports
import { ErrorUi } from "./ErrorUi";
// Util and I/O imports
import { addBetterErrorProps } from "../util/error";

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
        <Box flex="1" className="error-ui-containter_error-boundary">
          <ErrorUi error={addBetterErrorProps(this.state.error)} />
        </Box>
      );
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
