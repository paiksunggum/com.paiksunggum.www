"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import {
  Loader2,
  RefreshCw,
  Database,
  MessageCircle,
  Plus,
  SlidersHorizontal,
  Mic,
  ArrowUp,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getApiBase } from "@/lib/api-base";

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
      const res = await fetch(`${getApiBase()}/chat`, {
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
              Google Gemini와 대화
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
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Gemini에게 무엇이든 물어보세요</p>
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

          {ui.isLoading && (
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
      {ui.errorMessage && (
        <div className="flex-shrink-0 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800 px-4 py-3">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
            <p className="text-sm text-red-700 dark:text-red-400">
              {ui.errorMessage}
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

      {/* Gemini-style composer */}
      <footer className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 px-4 pt-2 pb-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto rounded-[2rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm px-4 pt-3 pb-3 flex flex-col gap-1"
        >
          <label htmlFor="gemini-input" className="sr-only">
            Gemini에게 물어보기
          </label>
          <textarea
            id="gemini-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Gemini에게 물어보기"
            rows={3}
            disabled={ui.isLoading}
            className="w-full min-h-[4.5rem] max-h-40 resize-none border-0 bg-transparent px-1 py-1 text-[15px] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="첨부 (준비 중)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="도구 (준비 중)"
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.75} />
                도구
              </button>
            </div>

            <div className="flex items-center gap-1">
              <Select
                value={ui.geminiModel}
                onValueChange={(geminiModel) => patchUi({ geminiModel })}
                disabled={ui.isLoading}
              >
                <SelectTrigger
                  size="sm"
                  className="h-9 border-0 bg-transparent shadow-none hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full px-3 text-sm text-gray-800 dark:text-gray-100 gap-1"
                >
                  <SelectValue placeholder="모델" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="gemini-2.5-flash">빠른 모델</SelectItem>
                  <SelectItem value="gemini-1.5-pro">고급 모델</SelectItem>
                </SelectContent>
              </Select>

              <button
                type="submit"
                disabled={ui.isLoading || !input.trim()}
                aria-label="보내기"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors"
              >
                {ui.isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowUp className="w-4 h-4" strokeWidth={2.25} />
                )}
              </button>

              <button
                type="button"
                aria-label="음성 입력 (준비 중)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Mic className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>
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
    <div className="h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900">
      {view === "qa" ? (
        <TitanicQAPage onSwitchView={() => setView("data")} />
      ) : (
        <TitanicSampleDataPage onSwitchView={() => setView("qa")} />
      )}
    </div>
  );
}
