import { NextResponse } from 'next/server';
import { z } from 'zod';
import axios from 'axios';
import { env } from '@/lib/env';

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
  typescript: 101,
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

    // Create submission using Judge0 API
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {
        base64_encoded: 'true',
        wait: 'true', // Changed to wait=true for immediate result
        fields: '*',
      },
      headers: {
        'x-rapidapi-key': `${env.JUDGE0_API_KEY}`,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        language_id: languageId,
        source_code: Buffer.from(code).toString('base64'),
        stdin: Buffer.from(stdin).toString('base64'),
      },
      timeout: 10000, // 10 second timeout
    };

    const response = await axios.request(options);
    console.log('judge0 response:', response.data);

    // Decode base64 outputs
    const base64Decode = (str: string) =>
      str ? Buffer.from(str, 'base64').toString() : '';

    return NextResponse.json({
      output: response.data.stdout
        ? base64Decode(response.data.stdout)
        : response.data.stderr
          ? base64Decode(response.data.stderr)
          : base64Decode(response.data.compile_output),
      status: response.data.status?.id || 0, //return status id or 0: InQueue
      time: response.data.time,
      memory: response.data.memory,
    });
  } catch (error) {
    console.error('Full error details:', error);

    // Type guard for axios errors
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: 'Code execution failed',
          details: error.response?.data || error.message,
        },
        { status: error.response?.status || 500 },
      );
    }

    // Handle other error types
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        error: 'Code execution failed',
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}
