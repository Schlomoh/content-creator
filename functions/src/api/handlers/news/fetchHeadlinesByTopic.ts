import { NewsResponse } from "@/types/news";

const API_URL = "https://newsapi.org/v2/everything";
const API_KEY = process.env.NEWS_API_KEY || "";

// A utility function to format the date for API calls
const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

async function fetchHeadlinesByTopic(query: string): Promise<NewsResponse> {
  // Calculate the date range for the past week
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const toDate = new Date();

  // Construct the URL parameters
  const params = new URLSearchParams({
    apiKey: API_KEY,
    q: query,
    from: formatDateForAPI(fromDate),
    to: formatDateForAPI(toDate),
    sortBy: "popularity",
    pageSize: "10",
  });

  // Fetch the news and parse the JSON response
  const response = await fetch(new URL(`${API_URL}?${params}`));
  return response.json();
}

export default fetchHeadlinesByTopic;
