/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";

import { CreationModal, StrategyModal, MainContainer } from "@/components";
import useGetUser from "@/store/utils/useGetUser";
import {
  setSettings,
  unfinishedBatchesSelector,
  modalOpenSelector,
  toggleCreationModal,
  toggleStrategyModal,
} from "@/store/slices";
import {
  getUnfinishedBatches,
  resetCreation,
} from "@/store/thunks";
import { AppDispatch } from "@/store";

const UnfinishedBatchesList = () => {
  const dispatch: AppDispatch = useDispatch();
  const unfinishedBatches = useSelector(unfinishedBatchesSelector);

  function handleListItemClick(index: number) {
    dispatch(resetCreation());
    dispatch(setSettings(unfinishedBatches[index]));
    dispatch(toggleCreationModal());

  }

  useEffect(() => {
    dispatch(getUnfinishedBatches());
  }, []);

  return (
    <List>
      {unfinishedBatches.length > 0 ? (
        unfinishedBatches.map((batch, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => handleListItemClick(index)}>
              <ListItemDecorator>
                <span className="material-icons-round">article</span>
              </ListItemDecorator>
              <ListItemContent>
                {batch.topic} / {batch.thoughts}
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        ))
      ) : (
        <></>
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
              <CardContent>
                <Typography level="body-sm">
                  You have {} followers right now.
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
