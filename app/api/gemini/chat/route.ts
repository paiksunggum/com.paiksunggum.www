import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; text: string };

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "서버에 GEMINI_API_KEY 환경 변수를 설정해 주세요." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[]; model?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  const { messages, model: modelId } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages가 필요합니다." }, { status: 400 });
  }

  const last = messages[messages.length - 1];
  if (last.role !== "user" || typeof last.text !== "string" || !last.text.trim()) {
    return NextResponse.json(
      { error: "마지막 메시지는 사용자(user) 텍스트여야 합니다." },
      { status: 400 }
    );
  }

  const modelName = typeof modelId === "string" && modelId.trim() ? modelId.trim() : "gemini-2.0-flash";

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: m.text }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(last.text);
    const answer = result.response.text();

    return NextResponse.json({ answer });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Gemini 요청 처리 중 오류가 발생했습니다.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
