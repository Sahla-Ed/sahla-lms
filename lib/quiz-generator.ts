import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { env } from "./env";
import { aiQuizGenerationSchema } from "./zodSchemas";

const openrouter = createOpenRouter({
  apiKey: env.OPEN_ROUTER_API_KEY,
});

export async function generateQuizQuestions(
  topic: string,
  numQuestions: number
) {
  const prompt = `
    Create ${numQuestions} high-quality quiz questions about the following topic: "${topic}".

    Follow these rules strictly:
    - For Multiple Choice (MCQ) questions, provide exactly 4 options.
    - For True/False questions, the options array must be exactly ["True", "False"].
    - The 'answer' field MUST be an exact copy of one of the strings in the 'options' array.
    - Provide a brief 'explanation' for why the answer is correct.
  `;

  const { object } = await generateObject({
    model: openrouter("moonshotai/kimi-k2:free"),
    system:
      "You are an expert quiz creator. You generate questions and answers based on the user's topic and strictly adhere to the provided JSON schema, including all validation rules.",
    prompt,
    schema: aiQuizGenerationSchema,
  });

  return object.questions;
}
