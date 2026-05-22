"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { Lora } from "next/font/google";

const chatSerif = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
});
import {
  Loader2,
  RefreshCw,
  Database,
  MessageCircle,
  ArrowUp,
  Menu,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiBase, getChatApiUrl } from "@/lib/api-base";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
interface Message {
  role: "user" | "assistant";
  text: string;
  ts: string; // ISO string
}

interface ChatApiResponse {
  answer: string;
}

/** FastAPI: { detail: string } | { detail: { msg: string }[] } */
function parseApiError(raw: unknown, status: number): string {
  if (typeof raw === "object" && raw !== null) {
    if ("error" in raw && typeof (raw as { error: unknown }).error === "string") {
      return (raw as { error: string }).error;
    }
    const detail = (raw as { detail?: unknown }).detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length > 0) {
      const first = detail[0];
      if (typeof first === "object" && first !== null && "msg" in first) {
        return String((first as { msg: unknown }).msg);
      }
    }
  }
  return `서버 오류: ${status}`;
}

type SampleDataRow = Record<string, unknown>;

type ChatUiState = {
  geminiModel: string;
  isLoading: boolean;
  errorMessage: string | null;
};

const initialChatUiState: ChatUiState = {
  geminiModel: "gemini-2.5-flash",
  isLoading: false,
  errorMessage: null,
};

type SampleDataState = {
  data: SampleDataRow[];
  isLoading: boolean;
  errorMessage: string | null;
};

const initialSampleDataState: SampleDataState = {
  data: [],
  isLoading: false,
  errorMessage: null,
};

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
  const [ui, setUi] = useState<ChatUiState>(initialChatUiState);
  const lastQuestionRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const patchUi = (patch: Partial<ChatUiState>) => {
    setUi((prev) => ({ ...prev, ...patch }));
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendQuestion = async (question: string) => {
    if (!question.trim()) return;

    lastQuestionRef.current = question;
    patchUi({ errorMessage: null, isLoading: true });

    const userMessage: Message = {
      role: "user",
      text: question,
      ts: new Date().toISOString(),
    };
    const thread = [...messages, userMessage];
    setMessages(thread);
    setInput("");

    try {
      const res = await fetch(getChatApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: thread.map(({ role, text }) => ({ role, text })),
          model: ui.geminiModel,
        }),
      });

      const raw: unknown = await res.json();

      if (!res.ok) {
        throw new Error(parseApiError(raw, res.status));
      }

      const data = raw as ChatApiResponse;
      if (typeof data.answer !== "string") {
        throw new Error("응답 형식이 올바르지 않습니다.");
      }

      const assistantMessage: Message = {
        role: "assistant",
        text: data.answer,
        ts: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      patchUi({
        errorMessage:
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
      });
    } finally {
      patchUi({ isLoading: false });
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

  const piCream = "#FAF3EB";
  const piGreen = "#0D3D2E";

  return (
    <div
      className="flex h-full flex-col"
      style={{ backgroundColor: piCream, color: piGreen }}
    >
      {/* Pi-style header */}
      <header className="relative flex-shrink-0 px-4 pb-2 pt-3">
        <button
          type="button"
          onClick={onSwitchView}
          aria-label="샘플 데이터 보기"
          className="absolute left-4 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#0D3D2E] shadow-sm transition-colors hover:bg-white"
        >
          <Menu className="h-4 w-4" strokeWidth={2} />
        </button>

        <div className="flex flex-col items-center gap-0.5 px-12">
          <h1 className="text-[15px] font-medium tracking-tight text-[#0D3D2E]">
            AI Chat
          </h1>
          <Select
            value={ui.geminiModel}
            onValueChange={(geminiModel) => patchUi({ geminiModel })}
            disabled={ui.isLoading}
          >
            <SelectTrigger
              size="sm"
              className="h-7 border-0 bg-transparent px-2 text-xs text-[#5A7A6E] shadow-none hover:bg-white/50 rounded-full"
            >
              <SelectValue placeholder="모델" />
            </SelectTrigger>
            <SelectContent align="center">
              <SelectItem value="gemini-2.5-flash">빠른 모델</SelectItem>
              <SelectItem value="gemini-1.5-pro">고급 모델</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          type="button"
          onClick={onSwitchView}
          aria-label="샘플 데이터"
          className="absolute right-4 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#0D3D2E] shadow-sm transition-colors hover:bg-white"
        >
          <Database className="h-4 w-4" strokeWidth={2} />
        </button>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-5 py-6">
        <div className="mx-auto max-w-xl space-y-3">
          {messages.length === 0 && (
            <div className="flex min-h-[50vh] items-center justify-center">
              <div className="flex flex-col items-center gap-1 text-center">
                <p
                  className={`${chatSerif.className} text-[17px] leading-relaxed text-[#0D3D2E]`}
                >
                  안녕하세요!
                </p>
                <p
                  className={`${chatSerif.className} text-[17px] leading-relaxed text-[#0D3D2E]`}
                >
                  AI Chat에 물어보세요.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={`${msg.ts}-${idx}`}
                className={`flex flex-col gap-1.5 ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                <span
                  className="text-[11px] font-medium uppercase tracking-wider text-[#5A7A6E]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {isUser ? "나" : "Gemini"}
                </span>

                {isUser ? (
                  <div className="max-w-[88%] rounded-3xl rounded-br-md border border-[#0D3D2E]/12 bg-white px-4 py-3 shadow-sm">
                    <p
                      className={`${chatSerif.className} text-[16px] leading-relaxed text-[#0D3D2E] whitespace-pre-wrap break-words`}
                    >
                      {msg.text}
                    </p>
                    <p className="mt-2 text-right text-[11px] text-[#5A7A6E]">
                      {formatTime(msg.ts)}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-[88%] rounded-3xl rounded-bl-md border border-[#0D3D2E]/12 bg-white px-4 py-3 shadow-sm">
                    <p
                      className={`${chatSerif.className} text-[16px] leading-relaxed text-[#0D3D2E] whitespace-pre-wrap break-words`}
                    >
                      {msg.text}
                    </p>
                    <p className="mt-2 text-[11px] text-[#5A7A6E]">
                      {formatTime(msg.ts)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {ui.isLoading && (
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[#5A7A6E]">
                Gemini
              </span>
              <Loader2 className="h-5 w-5 animate-spin text-[#5A7A6E]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Error */}
      {ui.errorMessage && (
        <div className="flex-shrink-0 border-t border-[#0D3D2E]/10 bg-[#F5E8DC] px-4 py-3">
          <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
            <p className="text-sm text-[#8B3A3A]">{ui.errorMessage}</p>
            <button
              type="button"
              onClick={handleRetry}
              aria-label="재시도"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#8B3A3A]/30 bg-white px-3 py-1.5 text-sm font-medium text-[#8B3A3A] transition-colors hover:bg-[#FAF3EB]"
            >
              <RefreshCw className="h-4 w-4" />
              재시도
            </button>
          </div>
        </div>
      )}

      {/* Pi-style composer */}
      <footer className="flex-shrink-0 px-4 pb-5 pt-2">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-xl items-end gap-2"
        >
          <label htmlFor="gemini-input" className="sr-only">
            메시지 입력
          </label>
          <div className="relative min-w-0 flex-1">
            <textarea
              id="gemini-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="무엇이든 물어보세요"
              rows={1}
              disabled={ui.isLoading}
              className="max-h-32 min-h-[48px] w-full resize-none rounded-full border-0 bg-white py-3.5 pl-5 pr-14 text-[15px] text-[#0D3D2E] shadow-sm placeholder:text-[#5A7A6E]/70 focus:outline-none focus:ring-2 focus:ring-[#0D3D2E]/15 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontFamily: "var(--font-sans)" }}
            />
            <button
              type="submit"
              disabled={ui.isLoading || !input.trim()}
              aria-label="보내기"
              className="absolute bottom-1.5 right-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#0D3D2E]/25 bg-[#0D3D2E]/55 text-white shadow-sm backdrop-blur-md transition-colors hover:bg-[#0D3D2E]/75 disabled:cursor-not-allowed disabled:bg-[#0D3D2E]/30 disabled:opacity-60"
            >
              {ui.isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
              )}
            </button>
          </div>
        </form>
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
  const [state, setState] = useState<SampleDataState>(initialSampleDataState);

  const patchState = (patch: Partial<SampleDataState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const fetchData = async () => {
    patchState({ isLoading: true, errorMessage: null });

    try {
      const res = await fetch(`${getApiBase()}/titanic/data`);
      if (!res.ok) {
        throw new Error(`서버 오류: ${res.status}`);
      }
      const json: SampleDataRow[] = await res.json();
      patchState({ data: json });
    } catch (err) {
      patchState({
        errorMessage:
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.",
      });
    } finally {
      patchState({ isLoading: false });
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
          {state.isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          )}

          {state.errorMessage && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
              <p className="text-sm text-red-700 dark:text-red-400 mb-2">
                {state.errorMessage}
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

          {!state.isLoading && !state.errorMessage && state.data.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>데이터가 없습니다</p>
            </div>
          )}

          {!state.isLoading &&
            !state.errorMessage &&
            state.data.map((row, idx) => (
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
───────────────────────────────────────────────────────────── */
export default function TitanicQaApp() {
  const [view, setView] = useState<"qa" | "data">("qa");

  return (
    <div className="h-[calc(100vh-3.5rem)] bg-[#FAF3EB]">
      {view === "qa" ? (
        <TitanicQAPage onSwitchView={() => setView("data")} />
      ) : (
        <TitanicSampleDataPage onSwitchView={() => setView("qa")} />
      )}
    </div>
  );
}
