/* eslint-disable react/no-unescaped-entities */
import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dropdown,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import humantime from "human-date";

import { CreationModal, StrategyModal, MainContainer } from "@/components";
import useGetUser from "@/store/utils/useGetUser";
import {
  setSettings,
  unfinishedBatchesSelector,
  modalOpenSelector,
  toggleCreationModal,
  toggleStrategyModal,
  setPhase,
} from "@/store/slices";
import {
  listenForContentStrategy,
  listenForUnfinishedBatches,
  removeContentBatch,
  resetCreation,
} from "@/store/thunks";
import { AppDispatch } from "@/store";

const UnfinishedBatchesList = () => {
  const [times, setTimes] = useState<string[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const unfinishedBatches = useSelector(unfinishedBatchesSelector);
  const sortedBatches = [...unfinishedBatches].sort((a, b) => b.date - a.date);

  function handleListItemClick(index: number) {
    dispatch(resetCreation());
    dispatch(setSettings(sortedBatches[index]));
    dispatch(toggleCreationModal());
    dispatch(setPhase(sortedBatches[index].phase));
  }

  function handleDeleteClick(event: MouseEvent, index: number) {
    event.stopPropagation();
    // delete unfinishedBatches[index];

    dispatch(removeContentBatch(sortedBatches[index]));
  }

  useEffect(() => {
    const unsubscribeUnfinishedBatches = dispatch(listenForUnfinishedBatches);
    const unsubscribeContentStrategy = dispatch(listenForContentStrategy);
    return () => {
      unsubscribeUnfinishedBatches();
      unsubscribeContentStrategy();
    };
  }, [dispatch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimes(
        sortedBatches.map((batch) =>
          humantime.relativeTime(new Date(batch.date))
        )
      );
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [times, sortedBatches]);

  return (
    <List sx={{ gap: 1 }}>
      {unfinishedBatches.length > 0 ? (
        sortedBatches.map((batch, index) => (
          <ListItem key={index} title={`${batch.topic} - ${batch.thoughts}`}>
            <ListItemButton
              onClick={() => handleListItemClick(index)}
              sx={{ borderRadius: 8, overflow: "hidden" }}
            >
              <ListItemDecorator>
                <span className="material-symbols-outlined">note_stack</span>
              </ListItemDecorator>
              <ListItemContent
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textWrap: "nowrap",
                }}
              >
                <Typography level="body-sm" display="inline">
                  Topic {"- "}
                </Typography>
                <strong>{batch.topic} · </strong>
                <Typography level="body-sm" display="inline">
                  Thoughts {"- "}
                </Typography>
                <strong>{batch.thoughts}</strong>
              </ListItemContent>
              <Typography
                level="body-sm"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  textWrap: "nowrap",
                }}
              >
                {times.length ? times[index] : "Loading..."}
              </Typography>
            </ListItemButton>
            <Dropdown>
              <MenuButton
                variant="plain"
                color="neutral"
                sx={{ m: -1, ml: 1, borderRadius: 8 }}
              >
                <span className="material-symbols-outlined">more_horiz</span>
              </MenuButton>
              <Menu variant="soft" sx={{ translate: -8 }}>
                <MenuItem
                  onClick={(event) => handleDeleteClick(event, index)}
                  color="danger"
                  variant="plain"
                >
                  <ListItemDecorator>
                    <span className="material-symbols-outlined">
                      delete_outline
                    </span>
                  </ListItemDecorator>
                  Delete Batch
                </MenuItem>
              </Menu>
            </Dropdown>
          </ListItem>
        ))
      ) : (
        <Typography level="body-md">No recent batches.</Typography>
      )}
    </List>
  );
};

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { creationModalOpen, strategyModalOpen } =
    useSelector(modalOpenSelector);
  const { user } = useGetUser();

  function handleCreationCLick() {
    dispatch(resetCreation());
    dispatch(toggleCreationModal());
  }

  function handleStrategyClick() {
    dispatch(toggleStrategyModal());
  }

  return (
    <>
      <MainContainer>
        <Grid container spacing={1.5}>
          <Grid md={6} width="100%">
            <Card variant="soft">
              <CardContent>
                <Typography level="h3">Hello, {user?.displayName}.</Typography>
                <Typography level="title-sm">
                  Let's create some content.
                </Typography>
              </CardContent>

              <CardActions buttonFlex={1}>
                <Button onClick={handleStrategyClick} color="primary">
                  Customize strategy
                </Button>
                <Button onClick={handleCreationCLick}>Create posts</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid md={6} width="100%">
            <Card variant="plain">
              <Typography level="h4">Unfinished batches</Typography>
              <CardContent>
                <UnfinishedBatchesList />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <CreationModal
          open={creationModalOpen}
          onClose={() => dispatch(toggleCreationModal())}
        />

        <StrategyModal
          open={strategyModalOpen}
          onClose={() => dispatch(toggleStrategyModal())}
        />
      </MainContainer>
    </>
  );
};

export default Dashboard;
