import { ArticlesEntity } from "./news";

export interface Database {
  strategy: Strategy;
  content: ContentBatch[];
}

interface Strategy {
  user: StrategyUserSelection;
  ai: StrategyAiResult;
}

export interface ContentBatch {
  batchId: string;
  date: number;
  finished: boolean;
  topic: string;
  thoughts: string;
  postAmount: number;
  selectedArticles: ArticlesEntity[];
  selectedPersonalStories: PersonalStory[];
  posts: Post[];
}

interface StrategyUserSelection {
  persona: string;
  topics: string[];
}

interface StrategyAiResult {
  improvedPersona: string;
  postTypes: string[];
  contentGuide: string;
}

interface PersonalStory {
  title: string;
  content: string;
}

interface Post {
  text: string;
  image: string;
  link: string;
  hashtags: string[];
}
