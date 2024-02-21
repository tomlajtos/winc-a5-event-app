// TODO: not catching response errors, find solution, fetch function should expose error...

import React from "react";
import { ErrorUi } from "./ErrorUi";

class PopupSearchErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUi error={this.state.error} />;
    }
    return this.props.children;
  }
}

export { PopupSearchErrorBoundary };
