import { Typography } from "@mui/joy";
import { MainContainer } from "@/components/Dashboard.tsx";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const [params] = useSearchParams();
  const infoText = params.has("error")
    ? "Error logging in: " + params.get("error")
    : "You are not logged in.";
  return (
    <MainContainer>
      <Typography>{infoText}</Typography>
    </MainContainer>
  );
};

export default LoginPage;
