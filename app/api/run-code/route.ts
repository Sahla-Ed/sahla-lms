// app/api/run-code/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import axios from 'axios';

const requestSchema = z.object({
  code: z.string().min(1),
  language: z.string().min(1),
  stdin: z.string().optional().default(''),
});

const LANGUAGE_IDS: Record<string, number> = {
  c: 50,
  cpp: 52,
  python: 71,
  javascript: 63,
  // Add more: https://ce.judge0.com/languages/
};

export async function POST(req: Request) {
  try {
    // Validate input
    const body = await req.json();
    const { code, language, stdin } = requestSchema.parse(body);

    // Get language ID
    const languageId = LANGUAGE_IDS[language.toLowerCase()];
    if (!languageId) {
      return NextResponse.json(
        { error: 'Unsupported language' },
        { status: 400 },
      );
    }

    // Encode to base64 (as in your curl example)
    const base64Encode = (str: string) => Buffer.from(str).toString('base64');

    // Create submission
    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*',
      {
        language_id: languageId,
        source_code: base64Encode(code),
        stdin: base64Encode(stdin),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      },
    );

    // Get submission token
    const token = response.data.token;

    // Retrieve result (poll until ready)
    const result = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      },
    );

    // Decode base64 outputs
    const base64Decode = (str: string) => Buffer.from(str, 'base64').toString();

    return NextResponse.json({
      output: result.data.stdout
        ? base64Decode(result.data.stdout)
        : result.data.stderr
          ? base64Decode(result.data.stderr)
          : base64Decode(result.data.compile_output),
      status: result.data.status.description,
      time: result.data.time,
      memory: result.data.memory,
    });
  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json(
      { error: 'Code execution failed' },
      { status: 500 },
    );
  }
}
