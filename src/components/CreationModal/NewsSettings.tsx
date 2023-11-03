import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
  styled,
} from "@mui/joy";
import { ArticlesEntity } from "@/store/types/news";
import { useGetNewsQuery } from "@/store/api";
import {
  creationNewsSelector,
  creationSelector,
  setSettings,
} from "@/store/slices";

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

// Helper Functions
const LoadingCard = () => (
  <SelectableCard>
    <CardContent>
      <Skeleton variant="text" height={20} width="100%" />
      <Skeleton variant="text" height={15} width={100} />
      <Skeleton variant="text" height={50} width="100%" />
    </CardContent>
  </SelectableCard>
);

const toggleArticleSelection = (
  isSelected: boolean,
  selectedArticles: ArticlesEntity[],
  article: ArticlesEntity,
  dispatch: ReturnType<typeof useDispatch>
) => {
  const newSelectedArticles = isSelected
    ? selectedArticles.filter((item) => item.title !== article.title)
    : [...selectedArticles, article];

  dispatch(setSettings({ newsArticles: newSelectedArticles }));
};

// Main Components
const ArticleCard = (article: ArticlesEntity) => {
  const dispatch = useDispatch();
  const selectedArticles = useSelector(creationNewsSelector) || [];
  const isSelected: boolean =
    selectedArticles?.some(
      (item: ArticlesEntity) => item.title === article.title
    ) ?? false;

  return (
    <SelectableCard
      onClick={() =>
        toggleArticleSelection(isSelected, selectedArticles, article, dispatch)
      }
      className={isSelected ? "selected" : ""}
    >
      <CardContent>
        <Typography level="title-md">{article.title}</Typography>
        <Typography level="body-sm" color="neutral">
          {article.author}
        </Typography>
        <Typography level="body-xs" color="neutral">
          {article.description}
        </Typography>
      </CardContent>
    </SelectableCard>
  );
};

const NewsSettings = () => {
  const { topic, thoughts } = useSelector(creationSelector);
  const { data: news, isLoading } = useGetNewsQuery(
    { topic, thoughts },
    { skip: !topic }
  );

  const renderContent = () => {
    if (isLoading) {
      return new Array(4)
        .fill(null)
        .map((_, index) => <LoadingCard key={index} />);
    }

    return news?.articles?.map((article) => (
      <ArticleCard {...article} key={article.title} />
    ));
  };

  return <Stack spacing={2}>{renderContent()}</Stack>;
};

export default NewsSettings;
