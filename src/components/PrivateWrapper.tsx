import { PropsWithChildren } from "react";
import { BoldPageInfo } from ".";
import { Navigate } from "react-router-dom";
import useGetUser from "@/store/utils/useGetUser";

const PrivateWrapper = ({ children }: PropsWithChildren) => {
  const { user, loading } = useGetUser();

  if (loading) return <BoldPageInfo text="Authenticating..." />;
  if (user) return children;
  return <Navigate to="/login" replace />;
};

export default PrivateWrapper;
