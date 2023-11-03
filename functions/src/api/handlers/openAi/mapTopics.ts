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
    content: `The chosen topic is: ${topic}. The thoughts are the following: ${
      thoughts || ""
    }.`,
  },
];

// Function metadata
const functionsMeta = [
  {
    name: "map_topic_to_category",
    description:
      "Based on the given topic and users thoughts find the best fitting query, later being used with the newsapi.org",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: `Various search criteria can be defined here...`,
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

  // Fetch completion
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
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
