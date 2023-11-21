/* eslint-disable react/no-unescaped-entities */
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Button,
  Card,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormHelperText,
  FormLabel,
  ModalClose,
  Stack,
  Textarea,
  Typography,
} from "@mui/joy";

import PostStructure from "./PostStructure";
import { useDispatch, useSelector } from "react-redux";
import { setPersona, strategySelector } from "@/store/slices";
import { ChangeEvent, useEffect } from "react";
import { useSetStrategyMutation } from "@/store/api/strategyApi";
import { updateContentStrategy } from "@/store/thunks";
import { AppDispatch } from "@/store";

interface Props {
  onClose: () => void;
  open: boolean;
}

const StrategyModal = ({ onClose, open }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const strategy = useSelector(strategySelector);
  const [send, { data, isLoading, isSuccess }] = useSetStrategyMutation();

  const { persona, generalTopics, structures } = strategy;

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(setPersona(event.target.value));
  }

  function handleClick() {
    send(strategy);
  }

  const disableButton = !persona && !generalTopics[0];

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(updateContentStrategy(data));
    }
  }, [isSuccess, data, dispatch]);

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
      <DialogContent>
        <AccordionGroup size="md">
          <Accordion>
            <AccordionSummary>Edit Strategy</AccordionSummary>
            <AccordionDetails sx={{ pt: 1.5 }}>
              <Stack direction="column" spacing={4}>
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
                    Define general topics to guide content creation
                  </FormLabel>
                  <PostStructure />
                </FormControl>
                <Button
                  disabled={disableButton || isLoading}
                  onClick={handleClick}
                >
                  Save
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary>Post structures</AccordionSummary>
            <AccordionDetails sx={{ pt: 1.5 }}>
              <Stack spacing={1.5} direction="column">
                {structures.map((structure, index) => (
                  <Card key={index}>
                    <Typography level="body-md">{structure.name}</Typography>
                    <Typography level="body-sm">{structure.outline}</Typography>
                  </Card>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </DialogContent>
    </Drawer>
  );
};

export default StrategyModal;
