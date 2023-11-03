export interface Database {
  strategy: Strategy;
  content: ContentBatch[];
}

interface Strategy {
  user: StrategyUserSelection;
  ai: StrategyAiResult;
}

interface ContentBatch {
  dateTime: string;
  finished: boolean;
  topic: string;
  thoughts: string;
  selectedArticles: Article[];
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

interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
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

export interface Source {
  id: string;
  name: string;
}
