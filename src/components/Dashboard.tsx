import { Box, styled, Typography } from "@mui/joy";

export const MainContainer = styled(Box)`
  padding: 1rem;
`;
const Dashboard = () => {
  return (
    <MainContainer>
      <Typography>Yay, loggged in 🎉</Typography>
    </MainContainer>
  );
};

export default Dashboard;
