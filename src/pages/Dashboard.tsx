/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/joy";

import { CreationModal, StrategyModal, MainContainer } from "@/components";
import useGetUser from "@/store/utils/useGetUser";

const Dashboard = () => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const { user } = useGetUser();

  function handleCreationCLick() {
    setShowCreationModal(true);
  }

  function handleStrategyClick() {
    setShowStrategyModal(true);
  }

  return (
    <>
      <MainContainer>
        <Grid container>
          <Grid md={6} sx={{width: "100%"}}>
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
                <Button onClick={handleCreationCLick}>Create posts</Button>
                <Button onClick={handleStrategyClick} color="primary">
                  Customize strategy
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </MainContainer>
      <CreationModal
        open={showCreationModal}
        onClose={() => setShowCreationModal(false)}
      />

      <StrategyModal
        open={showStrategyModal}
        onClose={() => setShowStrategyModal(false)}
      />
    </>
  );
};

export default Dashboard;
