import { Button, styled } from "@mui/joy";
import { useIsAuthenticatedQuery } from "@/store/api";

const StyledLoginButton = styled(Button)`
  transition: all 0.3s;
`;

const LoginButton = () => {
  const { data: isAuthenticated } = useIsAuthenticatedQuery();

  return (
    <StyledLoginButton
      variant="outlined"
      size="sm"
      color="neutral"
      onClick={() =>
        (window.location.href = isAuthenticated
          ? "/auth/logout"
          : "/auth/google")
      }
    >
      {isAuthenticated ? "Logout" : "Login with Google"}
    </StyledLoginButton>
  );
};
export default LoginButton;
