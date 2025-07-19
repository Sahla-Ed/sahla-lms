import { NextRequest, NextResponse } from "next/server";
import { generateQuizQuestions } from "@/lib/quiz-generator";

export async function POST(req: NextRequest) {
  const { topic, numQuestions } = await req.json();
  if (!topic || !numQuestions) {
    return NextResponse.json(
      { error: "Missing topic or numQuestions" },
      { status: 400 }
    );
  }
  try {
    const questions = await generateQuizQuestions(topic, numQuestions);
    return NextResponse.json({ questions });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
