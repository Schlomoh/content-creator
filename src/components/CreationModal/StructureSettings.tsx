import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Stack, Typography, styled } from "@mui/joy";

import {
  creationSelector,
  setSettings,
  strategySelector,
} from "@/store/slices";
import { ContentStructure } from "@/server/types/database";

// Styled components
const SelectableCard = styled(Card)`
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;
  border-width: 2px;
  &.selected {
    border: 2px solid ${({ theme }) => theme.palette.primary.plainActiveBg};
    background-color: ${({ theme }) => theme.palette.primary.plainHoverBg};
  }
  &:active {
    border: 2px solid ${({ theme }) => theme.palette.primary.plainActiveBg};
  }
`;

const useToggleStructureSelection = (
  isSelected: boolean,
  selectedContentStructures: ContentStructure[],
  structure: ContentStructure
) => {
  const dispatch = useDispatch();
  return () => {
    const newSelectedContentStructures = isSelected
      ? selectedContentStructures.filter((item) => item.name !== structure.name)
      : [...selectedContentStructures, structure];

    dispatch(
      setSettings({ selectedContentStructures: newSelectedContentStructures })
    );
  };
};

// Main Components
const StructureCard = (structure: ContentStructure) => {
  const { name, outline } = structure;
  const { selectedContentStructures } = useSelector(creationSelector);
  const isSelected =
    selectedContentStructures?.some((item) => item.name === name) ?? false;
  const onClick = useToggleStructureSelection(
    isSelected,
    selectedContentStructures ?? [],
    structure
  );
  return (
    <SelectableCard className={isSelected ? "selected" : ""} onClick={onClick}>
      <CardContent>
        <Typography level="title-md">{name}</Typography>
        <Typography level="body-sm" color="neutral">
          {outline}
        </Typography>
      </CardContent>
    </SelectableCard>
  );
};

const StructureSettings = () => {
  const { structures } = useSelector(strategySelector);

  const renderContent = () => {
    return structures.map((structure, i) => (
      <StructureCard {...structure} key={structure.name + i} />
    ));
  };

  return <Stack spacing={2}>{renderContent()}</Stack>;
};

export default StructureSettings;
