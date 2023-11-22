import { useGetPostsMutation } from "@/store/api";
import { creationSelector } from "@/store/slices";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import { useSelector } from "react-redux";

const PostSettings = () => {
  const { batchId } = useSelector(creationSelector);
  const [send, { data, isLoading }] = useGetPostsMutation();

  function handleClick() {
    if (batchId) send(batchId);
  }

  return (
    <>
      <Stack spacing={2}>
        <Button onClick={handleClick} fullWidth>
          Generate
        </Button>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="end"
          alignItems="center"
          gap={2}
        >
          <Typography level="body-xs">Add more information</Typography>
          <IconButton size="sm">
            <span className="material-symbols-outlined">add</span>
          </IconButton>
        </Box>
        <Tabs>
          <TabList>
            {isLoading
              ? "Loading..."
              : data?.posts.map((post, index) => (
                  <Tab key={index}>{post.title}</Tab>
                ))}
          </TabList>
          {isLoading
            ? "Loading..."
            : data?.posts.map((post, index) => (
                <TabPanel key={index} value={index}>
                  {post.text}
                </TabPanel>
              ))}
        </Tabs>
      </Stack>
    </>
  );
};

export default PostSettings;
