/* eslint-disable react/no-unescaped-entities */
import { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Drawer,
  ModalClose,
} from "@mui/joy";

import { modalPhaseSelector, nextPhase, previousPhase } from "@/store/slices";
import { updateContentBatch } from "@/store/thunks";
import { AppDispatch } from "@/store";

import GeneralSettings from "./GeneralSettings";
import NewsSettings from "./NewsSettings";
import ErrorBoundary from "./ErrorBoundary";

interface Props {
  onClose: () => void;
  open: boolean;
}

const CreationModal = ({ onClose, open }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { creationPhase } = useSelector(modalPhaseSelector);

  const Content = [GeneralSettings, NewsSettings, Box][creationPhase];

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(updateContentBatch());
    dispatch(nextPhase());
  }

  return (
    <Drawer
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      anchor="right"
      size="lg"
    >
      <DialogTitle>Content Creation</DialogTitle>
      <ModalClose />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inherit",
          flexDirection: "column",
          height: "inherit",
        }}
      >
        <ErrorBoundary>
          <Box p={2} sx={{ flex: "1 0 0", overflow: "auto" }}>
            <Content />
          </Box>
          <DialogActions buttonFlex={1} sx={{ p: 2, gap: 2 }}>
            <Button type="submit" disabled={creationPhase === 2}>
              Next
            </Button>
            <Button
              disabled={creationPhase === 0}
              onClick={() => dispatch(previousPhase())}
            >
              Back
            </Button>
          </DialogActions>
        </ErrorBoundary>
      </form>
    </Drawer>
  );
};

export default CreationModal;
