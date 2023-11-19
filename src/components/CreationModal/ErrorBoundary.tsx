import { Typography } from "@mui/joy";
import { Component, ErrorInfo, PropsWithChildren } from "react";

class ErrorBoundary extends Component<PropsWithChildren> {
  state: { error: unknown | null };

  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown): { error: unknown } {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <Typography level="body-md">Something went wrong.</Typography>;
    }
    return this.props.children;
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }
}

export default ErrorBoundary;
