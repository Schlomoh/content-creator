import { ContentStructure } from "@/types/database";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Construct the messages payload
const constructMessages = (
  persona: string,
  topicInterests: string
): ChatCompletionMessageParam[] => [
  {
    role: "user",
    content: `I need content ideas for a Twitter persona who is: ${persona}. The topics of interest are: ${topicInterests}. Please provide around 4 post structure guides. YOU MUST PLEASE CREATE A PARSABLE JSON.`,
  },
];

// Function metadata
const functionsMeta = [
  {
    name: "create_content_strategy",
    description:
      "Generates post skeletons/layouts as greater content schema for Twitter posts, designed to engange other users with interests in the picked topics.",
    parameters: {
      type: "object",
      properties: {
        contentStrategy: {
          type: "array",
          description: `Basic Twitter post structure or theme that objectively lays out the structure for an engaging and authentic Twitter post`,
          items: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: `The title of the post structure`,
              },
              outline: {
                type: "string",
                description: `The outline of the post`,
              },
            },
          },
        },
      },
      required: ["contentStrategy"],
    },
  },
];

async function createContentStrategy(
  persona: string,
  topicInterests: string
): Promise<{ contentStrategy: ContentStructure[] } | null> {
  const messages = constructMessages(persona, topicInterests);
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

export default createContentStrategy;
