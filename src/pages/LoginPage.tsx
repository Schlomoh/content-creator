import { Navigate, useSearchParams } from "react-router-dom";
import { BoldPageInfo } from "@/components";

import useGetUser from "@/store/utils/useGetUser";

const LoginPage = () => {
  const [params] = useSearchParams();
  const { user } = useGetUser();
  const infoText = params.has("error")
    ? "Error logging in: " + params.get("error")
    : "You are not logged in.";

  if (user) return <Navigate to="/" replace />;
  return <BoldPageInfo text={infoText} />;
};

export default LoginPage;
