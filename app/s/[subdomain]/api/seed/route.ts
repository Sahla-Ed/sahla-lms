import { NextRequest, NextResponse } from 'next/server';
// import seed from '@/scripts/seed';

export async function GET(req: NextRequest) {
  try {
    // console.log(JSON.stringify(req));
    // seed();
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
