import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, setUser, userSelector } from "@/store/slices";
import { AppDispatch } from "..";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseSetup";

const useGetUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(userSelector);
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.toJSON() as User));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return { user, loading };
};

export default useGetUser;
