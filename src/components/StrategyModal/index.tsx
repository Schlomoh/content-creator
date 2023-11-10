/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormHelperText,
  FormLabel,
  ModalClose,
  Stack,
  Textarea,
} from "@mui/joy";

import PostStructure from "./PostStructure";
import { useDispatch, useSelector } from "react-redux";
import { setPersona, strategySelector } from "@/store/slices";
import { ChangeEvent, useEffect } from "react";
import { useSetStrategyMutation } from "@/store/api/strategyApi";

interface Props {
  onClose: () => void;
  open: boolean;
}

const StrategyModal = ({ onClose, open }: Props) => {
  const dispatch = useDispatch();
  const strategy = useSelector(strategySelector);
  const [send, { isLoading, isSuccess }] = useSetStrategyMutation();

  const { persona, contentStructure } = strategy;

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(setPersona(event.target.value));
  }

  function handleClick() {
    send(strategy);
  }

  const disableButton = !persona && !contentStructure[0];

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <Drawer
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      anchor="left"
      size="lg"
    >
      <ModalClose />
      <DialogTitle>Content Strategy</DialogTitle>
      <DialogContent sx={{ flex: "1 0 0" }}>
        <Stack direction="column" spacing={4} p={2}>
          <FormControl>
            <FormLabel>Describe the persona the AI should play</FormLabel>
            <Textarea
              minRows={2}
              maxRows={4}
              value={persona || ""}
              onChange={handleChange}
              autoComplete="off"
              placeholder="e.g. a young programmer always on a new project"
            ></Textarea>
            <FormHelperText>
              e.g. a young programmer always on a new project
            </FormHelperText>
          </FormControl>

          <FormControl>
            <FormLabel>
              Define the Structure each post should roughly follow
            </FormLabel>
            <PostStructure />
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions buttonFlex={1} sx={{ p: 2, gap: 2 }}>
        <Button disabled={disableButton || isLoading} onClick={handleClick}>
          Save
        </Button>
      </DialogActions>
    </Drawer>
  );
};

export default StrategyModal;
