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

import {
  creationSelector,
  modalPhaseSelector,
  nextPhase,
  previousPhase,
} from "@/store/slices";
import { updateContentBatch } from "@/store/thunks";
import { AppDispatch } from "@/store";

import GeneralSettings from "./GeneralSettings";
import NewsSettings from "./NewsSettings";
import ErrorBoundary from "./ErrorBoundary";
import StructureSettings from "./StructureSettings";
import PostSettings from "./PostSettings";

interface Props {
  onClose: () => void;
  open: boolean;
}

const CreationModal = ({ onClose, open }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { creationPhase } = useSelector(modalPhaseSelector);
  const { topic, thoughts } = useSelector(creationSelector);

  const batchTopicThoughtsTitle =
    topic && thoughts ? `${topic} - ${thoughts}` : "New Batch";

  const Content = [
    GeneralSettings,
    NewsSettings,
    StructureSettings,
    PostSettings,
  ][creationPhase];

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(nextPhase());
    dispatch(updateContentBatch());
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
      <DialogTitle
        sx={{
          display: 'block',
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "80%",
        }}
      >
        Content Creation | {batchTopicThoughtsTitle}
      </DialogTitle>
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
          <Box p={1.5} sx={{ flex: "1 0 0", overflow: "auto" }}>
            <Content />
          </Box>
          <DialogActions buttonFlex={1} sx={{ p: 1.5, gap: 1 }}>
            <Button type="submit" disabled={creationPhase === 3}>
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
