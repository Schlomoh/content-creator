import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { initiateLoginWithTwitter, logout } from "@/store/thunks/authThunks";

import useGetUser from "@/store/utils/useGetUser";
import { Button } from "@mui/joy";

function LoginButton() {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useGetUser();

  const handleLogin = () => dispatch(initiateLoginWithTwitter());
  const handleLogout = () => dispatch(logout());

  return (
    <Button variant="outlined" onClick={user ? handleLogout : handleLogin} color='neutral'>
      {user ? "Log out" : "Login with Twitter"}
    </Button>
  );
}

export default LoginButton;
