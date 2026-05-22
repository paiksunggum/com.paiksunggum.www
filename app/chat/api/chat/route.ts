import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant"; text: string };

type ChatRequestBody = {
  message?: string;
  messages?: ChatMessage[];
  model?: string;
};

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ChatRequestBody;

    let thread: ChatMessage[];
    if (body.messages?.length) {
      thread = body.messages;
    } else if (body.message?.trim()) {
      thread = [{ role: "user", text: body.message.trim() }];
    } else {
      return NextResponse.json(
        { error: "message 또는 messages 가 필요합니다." },
        { status: 400 },
      );
    }

    const last = thread[thread.length - 1];
    if (last.role !== "user") {
      return NextResponse.json(
        { error: "마지막 메시지는 user 여야 합니다." },
        { status: 400 },
      );
    }

    const modelId =
      body.model?.trim() ||
      process.env.GEMINI_MODEL?.trim() ||
      "gemini-2.5-flash";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelId });

    const history = thread.slice(0, -1).map((msg) => ({
      role: (msg.role === "user" ? "user" : "model") as "user" | "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(last.text);
    const answer = result.response.text();

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
