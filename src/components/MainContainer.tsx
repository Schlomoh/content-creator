import { Box, styled } from "@mui/joy";

const StyledMainContainer = styled("main")`
  padding: 0 1rem 1rem;
  height: inherit;
  display: flex;
  flex-direction: column;
`;

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledMainContainer>
      <Box sx={{ height: "5rem" }}></Box>
      {children}
    </StyledMainContainer>
  );
};

export default MainContainer;
