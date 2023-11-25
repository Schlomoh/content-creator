import { ChatCompletionMessageParam } from "openai/resources";
import { ContentBatch, Post } from "@/types/database";
import { openai } from ".";

// Construct the messages payload
const constructMessages = (
  batch: ContentBatch
): ChatCompletionMessageParam[] => [
  {
    role: "system",
    content: `Act as the following Twitter persona: ${batch.persona}`,
  },
  {
    role: "system",
    content: `The following is a list of basic Twitter post structures or themes that objectively lay out the structure for an engaging and authentic Twitter post. Use the following to create a selection of different twitter posts that are engaging for my target audience. The guides: ${JSON.stringify(
      batch.selectedContentStructures
    )}`,
  },
  {
    role: "system",
    content: `The following is a list of current news summaries which you can use to enhance your content for the Twitter posts. The news: ${JSON.stringify(
      batch.selectedArticles
    )}.`,
  },
  {
    role: "user",
    content: `Create a selection of different twitter posts that are engaging for my target audience. Do not include any hashtags. The topics of interest are: ${batch.topic}. Please provide around ${batch.postAmount} posts. `,
  },
];

// Function metadata
const functionsMeta = [
  {
    name: "create_posts",
    description:
      "Create engaging and authentic Twitter posts for my target audience",
    parameters: {
      type: "object",
      properties: {
        posts: {
          type: "array",
          description: `Twitter posts using the given content schema`,
          items: {
            type: "object",
            optional: true,
            properties: {
              title: {
                type: "string",
                description: `The title of the post. Short, only for visual purposes`,
              },
              text: {
                type: "string",
                description: `The content of the post without hashtags`,
              },
            },
          },
        },
      },
      required: ["posts"],
    },
  },
];

async function createPosts(
  batch: ContentBatch
): Promise<{ posts: Post[] } | null> {
  const messages = constructMessages(batch);

  // Fetch completion
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages,
    functions: functionsMeta,
    function_call: {'name': 'create_posts'},
  });

  const responseMessage = chatCompletion.choices[0].message;

  // If there's no function call, return null
  if (!responseMessage.function_call) return null;

  return JSON.parse(responseMessage.function_call.arguments);
}

export default createPosts;
