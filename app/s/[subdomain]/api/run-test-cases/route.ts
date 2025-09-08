import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

const langMap: Record<string, number> = {
  python: 71,
  javascript: 63,
  typescript: 74,
  cpp: 54,
  c: 50,
};

async function pollJudge0Result(token: string) {
  let attempts = 0;
  while (attempts < 20) {
    const res = await fetch(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false&fields=*`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const data = await res.json();
    if (data.status && data.status.id >= 3) return data;
    await new Promise((resolve) => setTimeout(resolve, 500));
    attempts++;
  }
  return { status: { description: 'Timeout' } };
}

export async function POST(req: Request) {
  const { code, language, testCases } = await req.json();
  const languageId = langMap[language] || 71;

  const results: any[] = [];
  for (const tc of testCases) {
    const judgeRes = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true&fields=*',
      {
        method: 'POST',
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: tc.input,
          expected_output: tc.expectedOutput,
          cpu_time_limit: tc.timeLimit,
          memory_limit: tc.memoryLimit * 1024,
        }),
        headers: {
          'x-rapidapi-key': `${env.JUDGE0_API_KEY}`,
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      },
    );
    const response = await judgeRes.json();
    console.log('############ response', response);
    results.push({
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: response.stdout,
      status: response.status?.description || 'Unknown',
      time: response.time,
      memory: response.memory,
      error: response.stderr,
    });
  }
  return NextResponse.json({ results });
}
