import { Box, Typography, styled } from "@mui/joy";
import { MainContainer } from "@/components";

interface Props {
  text: string;
}

const CenterContainer = styled(Box)`
  width: inherit;
  height: inherit;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const BoldPageInfo = ({ text }: Props) => {
  return (
    <MainContainer>
      <CenterContainer>
        <span className="material-icons-round" style={{ fontSize: "48px", opacity: 0.5 }}>
          info
        </span>
        <Typography level="title-lg">{text}</Typography>
      </CenterContainer>
    </MainContainer>
  );
};

export default BoldPageInfo;
