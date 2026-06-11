"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type Message = { role: "user" | "captain"; text: string };

export default function CaptainSmithPage() {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "captain", text: "알겠소. 나는 에드워드 존 스미스 선장이오. 지금 이 시각, 타이타닉의 함교에 서 있소. 무엇이 궁금하시오?" },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = (formData.get("message") as string).trim();
    if (!message) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/backend/api/titanic/smith/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "captain", text: data.answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: "captain", text: "통신 오류가 발생했소." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-160px)] flex-col space-y-4">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">LESSON</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">스미스 선장과 대화</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          RMS 타이타닉의 선장 에드워드 존 스미스와 대화해보세요.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl border bg-card p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.role === "captain" && (
                <p className="mb-1 text-xs font-semibold text-muted-foreground">스미스 선장</p>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-muted px-4 py-2 text-sm text-muted-foreground">
              답변 중...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          name="message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="선장에게 질문하세요..."
          className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          disabled={loading}
          autoComplete="off"
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          전송
        </Button>
      </form>
    </div>
  );
}
