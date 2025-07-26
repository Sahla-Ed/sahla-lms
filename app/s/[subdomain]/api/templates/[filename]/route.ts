import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const templates = {
  'questions_template.json': {
    questions: [
      {
        text: 'What is the capital of France?',
        type: 'MCQ',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris',
        explanation: 'Paris is the capital and largest city of France.',
      },
      {
        text: 'JavaScript is a programming language.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        answer: 'True',
        explanation: 'JavaScript is indeed a programming language.',
      },
    ],
  },
  'questions_template.txt': `text,type,options,answer,explanation
What is the capital of France?,MCQ,Paris|London|Berlin|Madrid,Paris,Paris is the capital and largest city of France.
JavaScript is a programming language.,TRUE_FALSE,True|False,True,JavaScript is indeed a programming language.`,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } },
) {
  const filename = params.filename;

  if (!templates[filename as keyof typeof templates]) {
    return new NextResponse('Template not found', { status: 404 });
  }

  const content = templates[filename as keyof typeof templates];
  const contentType = filename.endsWith('.json')
    ? 'application/json'
    : 'text/plain';

  return new NextResponse(
    typeof content === 'string' ? content : JSON.stringify(content, null, 2),
    {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    },
  );
}
