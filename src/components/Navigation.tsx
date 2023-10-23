import { Box, Card, styled } from "@mui/joy";
import { LoginButton } from "@/components/index.ts";

const NavBar = styled("nav")`
  position: fixed;

  width: calc(100% - 2rem);
  margin: 1rem;
  top: 0;
  left: 0;
`;

const NavCard = styled(Card)`
  width: 100%;
  height: 100%;
  padding: 0.5rem;

  display: flex;
  flex-direction: row;
`;

const Navigation = () => {
  return (
    <>
      <NavBar>
        <NavCard color="neutral">
          <LoginButton />
        </NavCard>
      </NavBar>
      <Box sx={{ height: "5rem" }}></Box>
    </>
  );
};

export default Navigation;
