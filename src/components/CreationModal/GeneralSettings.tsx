/* eslint-disable react/no-unescaped-entities */

import { FormControl, FormHelperText, FormLabel, Input, Stack } from "@mui/joy";

import { useHandleInputChange } from "./useHandleInputChange";
import { creationSelector } from "@/store/slices";
import { useSelector } from "react-redux";

const GeneralSettings = () => {
  const handleChange = useHandleInputChange();
  const { topic, thoughts, postAmount } = useSelector(creationSelector);

  return (
    <>
      <Stack spacing={2}>
        <FormControl>
          <FormLabel>Topic</FormLabel>
          <Input
            name="topic"
            type="text"
            onChange={handleChange}
            value={topic}
            placeholder="E.g. 3D web content"
            autoComplete="off"
            required
          />
          <FormHelperText>
            Roughly point the assistant in a direction
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Thoughts</FormLabel>
          <Input
            name="thoughts"
            type="text"
            onChange={handleChange}
            value={thoughts}
            autoComplete="off"
            placeholder="Your thoughts and ideas"
          />
          <FormHelperText>
            Give additional thoughts and context if possible
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Post amount</FormLabel>
          <Input
            name="postAmount"
            type="number"
            onChange={handleChange}
            value={postAmount}
            autoComplete="off"
            required
          />
          <FormHelperText>Set how many posts you want to create</FormHelperText>
        </FormControl>
      </Stack>
    </>
  );
};

export default GeneralSettings;
