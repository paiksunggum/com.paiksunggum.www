"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { Send, Loader2, RefreshCw, Database, MessageCircle } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   API Base URL
───────────────────────────────────────────────────────────── */
const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
interface Message {
  role: "user" | "assistant";
  text: string;
  ts: string; // ISO string
  confidence?: number;
  sources?: string[];
}

interface QaResponse {
  answer: string;
  confidence: number;
  sources: string[];
}

type SampleDataRow = Record<string, unknown>;

/* ─────────────────────────────────────────────────────────────
   TitanicQAPage (Main View)
───────────────────────────────────────────────────────────── */
function TitanicQAPage({
  onSwitchView,
}: {
  onSwitchView: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const lastQuestionRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendQuestion = async (question: string) => {
    if (!question.trim()) return;

    lastQuestionRef.current = question;
    setErrorMessage(null);
    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      role: "user",
      text: question,
      ts: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch(`${apiBaseUrl}/titanic/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }

      const data: QaResponse = await res.json();

      const assistantMessage: Message = {
        role: "assistant",
        text: data.answer,
        ts: new Date().toISOString(),
        confidence: data.confidence,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion(input);
    }
  };

  const handleRetry = () => {
    if (lastQuestionRef.current) {
      // Remove the last user message before retrying
      setMessages((prev) => prev.slice(0, -1));
      sendQuestion(lastQuestionRef.current);
    }
  };

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Titanic QA Assistant
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              타이타닉 데이터 기반 질의응답
            </p>
          </div>
          <button
            type="button"
            onClick={onSwitchView}
            aria-label="샘플 데이터 보기"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Database className="w-4 h-4" />
            샘플 데이터
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-lg mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>질문을 입력해주세요</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={`${msg.ts}-${idx}`}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>

                {/* Assistant extras */}
                {msg.role === "assistant" && (
                  <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    {msg.confidence !== undefined && (
                      <p>
                        <span className="font-medium">신뢰도:</span>{" "}
                        {(msg.confidence * 100).toFixed(1)}%
                      </p>
                    )}
                    {msg.sources && msg.sources.length > 0 && (
                      <p>
                        <span className="font-medium">출처:</span>{" "}
                        {msg.sources.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                <p
                  className={`text-xs mt-1 ${
                    msg.role === "user"
                      ? "text-blue-200"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {formatTime(msg.ts)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Error */}
      {errorMessage && (
        <div className="flex-shrink-0 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 px-4 py-3">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-3">
            <p className="text-sm text-red-700 dark:text-red-400">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              aria-label="재시도"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              재시도
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <footer className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto flex items-end gap-2"
        >
          <div className="flex-1">
            <label htmlFor="question-input" className="sr-only">
              질문 입력
            </label>
            <textarea
              id="question-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="예: 25세 남성 3등석 생존 가능성은?"
              maxLength={500}
              rows={1}
              disabled={isLoading}
              className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="전송"
            className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
        <p className="max-w-lg mx-auto text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">
          {input.length}/500
        </p>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TitanicSampleDataPage (Secondary View)
───────────────────────────────────────────────────────────── */
function TitanicSampleDataPage({
  onSwitchView,
}: {
  onSwitchView: () => void;
}) {
  const [data, setData] = useState<SampleDataRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${apiBaseUrl}/titanic/data`);
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
      const json: SampleDataRow[] = await res.json();
      setData(json);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              샘플 데이터
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              타이타닉 승객 데이터
            </p>
          </div>
          <button
            type="button"
            onClick={onSwitchView}
            aria-label="QA 채팅으로 돌아가기"
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            QA 채팅
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-lg mx-auto space-y-4">
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
              <p className="text-sm text-red-700 dark:text-red-400 mb-2">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={fetchData}
                aria-label="재시도"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                재시도
              </button>
            </div>
          )}

          {!isLoading && !errorMessage && data.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>데이터가 없습니다</p>
            </div>
          )}

          {!isLoading &&
            !errorMessage &&
            data.map((row, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4"
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  {Object.entries(row).map(([key, value]) => (
                    <div key={key} className="contents">
                      <span className="font-medium text-gray-500 dark:text-gray-400 truncate">
                        {key}
                      </span>
                      <span className="text-gray-900 dark:text-gray-100 truncate">
                        {String(value ?? "-")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TitanicQaApp (Root Component)
──────��────────────────────────────────────────────────────── */
export default function TitanicQaApp() {
  const [view, setView] = useState<"qa" | "data">("qa");

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900">
      {view === "qa" ? (
        <TitanicQAPage onSwitchView={() => setView("data")} />
      ) : (
        <TitanicSampleDataPage onSwitchView={() => setView("qa")} />
      )}
    </div>
  );
}
