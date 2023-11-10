export interface NewsResponse {
  status: string;
  totalResults: number;
  articles?: ArticlesEntity[] | null;
}

export interface ArticlesEntity {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Source {
  id: string;
  name: string;
}
