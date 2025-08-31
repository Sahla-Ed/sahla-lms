import { NextRequest, NextResponse } from 'next/server';

import sahlaArMessages from '@/messages/sahla-ar.json';
import sahlaEnMessages from '@/messages/sahla-en.json';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ filename: string }> },
) {
  const { filename } = await context.params;

  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'ar';

  const messages = locale === 'en' ? sahlaEnMessages : sahlaArMessages;
  const templates = messages.FileTemplates;

  let content: string | Record<string, unknown>;
  let contentType: string;

  if (filename === 'questions_template.json') {
    content = templates.jsonTemplate;
    contentType = 'application/json';
  } else if (filename === 'questions_template.csv') {
    content = templates.csvTemplate;
    contentType = 'text/csv';
  } else {
    return new NextResponse('Template not found', { status: 404 });
  }

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
