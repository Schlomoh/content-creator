import { ChangeEvent, KeyboardEvent } from "react";
import { Card, IconButton, Input, Stack, Typography, styled } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { setGeneralTopics, strategySelector } from "@/store/slices";

// Style components
const StrategyItemCard = styled(Card)`
  padding: 0.25rem 0.25rem 0.25rem 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StrategyItemText = styled(Typography)`
  overflow: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

// Helper function for deleting a strategy item at a specific index
const deleteItemAt = (arr: string[], index: number) =>
  arr.filter((_, i) => i !== index);

// Main component
const PostStructure = () => {
  const dispatch = useDispatch();
  const { generalTopics: topics } = useSelector(strategySelector);

  // Handles the change of input and updates the structure state
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setGeneralTopics([...topics.slice(0, -1), value]));
  };

  // Handles blur event and updates the structure state
  const handleBlur = () => {
    const lastElement = topics[topics.length - 1];
    if (lastElement !== "") {
      dispatch(setGeneralTopics([...topics, ""]));
    }
  };

  // Handles Enter key press and delegates to handleBlur
  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleBlur();
    }
  };

  const displayedStructure = topics.slice(0, -1);
  const currentInputValue = topics[topics.length - 1] || "";

  return (
    <Stack direction={"column"} spacing={1}>
      {displayedStructure.map((item, index) => (
        <StrategyItemCard key={index} variant="soft" title={item}>
          {/* Converts the item to uppercase */}
          <StrategyItemText level="body-md">
            {item.toLocaleUpperCase()}
          </StrategyItemText>
          {/* Delete button */}
          <IconButton
            size="sm"
            onClick={() =>
              dispatch(setGeneralTopics(deleteItemAt(topics, index)))
            }
          >
            <span className="material-icons-round">delete</span>
          </IconButton>
        </StrategyItemCard>
      ))}

      <Input
        onBlur={handleBlur}
        variant="outlined"
        name="structure"
        type="text"
        placeholder="Add a new general topic"
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={currentInputValue}
        autoComplete="off"
      />
    </Stack>
  );
};

export default PostStructure;
