import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { setSettings } from "@/store/slices";

export const useHandleInputChange = () => {
  const dispatch = useDispatch();

  return function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setSettings({ [event.target.name]: event.target.value }));
  };
};
