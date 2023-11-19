import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Construct the messages payload
const constructMessages = (
  topic: string,
  thoughts?: string
): ChatCompletionMessageParam[] => [
  {
    role: "user",
    content: `The user wants to know about the topic: ${topic}. Specific thoughts and interest are the following: ${thoughts}.`,
  },
];

// Function metadata
const functionsMeta = [
  {
    name: "map_topic_to_category",
    description:
      "Based on the given topic and users thoughts finds the best fitting query, later being used with the newsapi.org",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: `The newsapi.org query to fetch the most recent news related to the topic`,
        },
      },
      required: ["query"],
    },
  },
];

async function mapTopics(
  topic: string,
  thoughts?: string
): Promise<{ query: string } | null> {
  const messages = constructMessages(topic, thoughts);
  console.log(messages);

  // Fetch completion
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages,
    functions: functionsMeta,
    function_call: "auto",
  });

  const responseMessage = chatCompletion.choices[0].message;

  // If there's no function call, return null
  if (!responseMessage.function_call) return null;

  return JSON.parse(responseMessage.function_call.arguments);
}

export default mapTopics;
