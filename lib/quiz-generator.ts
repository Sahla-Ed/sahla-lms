import { env } from './env';
import { aiQuizGenerationSchema } from './zodSchemas';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateQuizQuestions(
  topic: string,
  numQuestions: number,
) {
  await sleep(2000);

  const prompt = `
    Create ${numQuestions} high-quality quiz questions about the following topic: "${topic}".

    Follow these rules strictly:
    - For Multiple Choice (MCQ) questions, provide exactly 4 options.
    - For True/False questions, the options array must be exactly ["True", "False"].
    - The 'answer' field MUST be an exact copy of one of the strings in the 'options' array.
    - Provide a brief 'explanation' for why the answer is correct.
    - The output must be a JSON object like:
      {
        "questions": [
          {
            "text": "What is 2+2?",
            "type": "MCQ",
            "options": ["3", "4", "5", "6"],
            "answer": "4",
            "explanation": "2+2 equals 4."
          },
          {
            "text": "The sky is blue.",
            "type": "TRUE_FALSE",
            "options": ["True", "False"],
            "answer": "True",
            "explanation": "On a clear day, the sky appears blue due to Rayleigh scattering."
          }
        ]
      }
    - The 'type' field must be either 'MCQ' or 'TRUE_FALSE'.
    - The 'options' field must be an array of 4 strings for MCQ, or exactly ['True', 'False'] for TRUE_FALSE.
    - The 'answer' field must be one of the options.
    - The 'text' and 'explanation' fields must be non-empty strings.
    - Return only the JSON object, nothing else.
  `;

  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env?.OPEN_ROUTER_API_KEY || '', // Use your Google AI API key
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "You are an expert quiz creator. You generate questions and answers based on the user's topic and strictly adhere to the provided JSON schema, including all validation rules.",
              },
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          response_mime_type: 'application/json', // Instruct the model to output JSON
        },
      }),
    },
  );

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Google AI API error: ${res.status} ${res.statusText} - ${errorBody}`,
    );
  }

  const data = await res.json();
  let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('No content returned from Google AI API');
  }

  // The Gemini API with response_mime_type should return valid JSON directly.
  // The match and re-parse might not be strictly necessary if the API behaves as expected,
  // but it's kept here for robustness against minor variations in the response.
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AI response does not contain a JSON object');
  }
  text = jsonMatch[0];

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    console.log(e);
    throw new Error('AI response is not valid JSON');
  }

  const result = aiQuizGenerationSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      'AI response does not match schema: ' +
        JSON.stringify(result.error.issues),
    );
  }

  return result.data.questions;
}
