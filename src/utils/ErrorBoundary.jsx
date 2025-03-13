import React, { Component } from "react";
import { ApiError } from "./ApiError"; // Correct the import path if needed

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error using the custom ApiError
    const apiError = new ApiError(500, error.message, [], error.stack);
    console.error("Error caught by ErrorBoundary: ", apiError);

    // Optionally, you can log this to an external service like Sentry, LogRocket, etc.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            backgroundColor: "lightyellow",
            border: "1px solid red",
          }}
        >
          <h2>Something went wrong.</h2>
          <p>Please try again later.</p>
        </div>
      );
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
