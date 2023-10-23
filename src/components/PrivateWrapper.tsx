import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsAuthenticatedQuery } from "@/store/api";
import { Typography } from "@mui/joy";

const PrivateWrapper = ({ children }: PropsWithChildren) => {
  const { data: isAuthenticated, isLoading } = useIsAuthenticatedQuery();
  const location = useLocation();

  // If data is not yet available, show the "Authenticating..." message
  if (isLoading) {
    return <Typography>Authenticating...</Typography>;
  }

  // If data is available and authenticated is true, render children
  if (isAuthenticated) {
    return children;
  }

  // If data is available and authenticated is false, redirect to login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateWrapper;
