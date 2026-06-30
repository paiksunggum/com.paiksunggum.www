"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getApiBase } from "@/lib/api-base";
import type { Contact } from "@/app/automode/page";

const DEFAULT_CONTACTS: Contact[] = [{ name: "나", email: "bsgum@naver.com" }];

export default function EmailSendForm({
  contacts = DEFAULT_CONTACTS,
}: {
  contacts?: Contact[];
}) {
  const [loading, setLoading] = React.useState(false);
  const [to, setTo] = React.useState("");
  const [toName, setToName] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const suggestions = contacts.filter(
    (c) =>
      to.length > 0 &&
      (c.name.includes(to) || c.email.includes(to)),
  );

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const prompt = String(new FormData(form).get("prompt") ?? "").trim();

    setLoading(true);
    try {
      const res = await fetch(`${getApiBase()}/api/automode/email/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, prompt, to_name: toName }),
      });
      if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
      const json = (await res.json()) as { subject: string };
      toast.success(`이메일 발송 완료`, {
        description: `제목: ${json.subject}`,
      });
      form.reset();
      setTo("");
      setToName("");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "이메일 발송에 실패했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="email-to">수신자 이메일</Label>
        <div className="relative">
          <Input
            id="email-to"
            name="to"
            type="text"
            placeholder="이름 또는 이메일 입력"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setToName("");
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            required
            disabled={loading}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
              {suggestions.map((c) => (
                <li
                  key={`${c.name}-${c.email}`}
                  className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-accent"
                  onMouseDown={() => {
                    setTo(c.email);
                    setToName(c.name);
                    setShowSuggestions(false);
                  }}
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="text-muted-foreground">{c.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email-prompt">이메일 내용 요청</Label>
        <Textarea
          id="email-prompt"
          name="prompt"
          placeholder="예: 신제품 출시를 알리는 짧은 뉴스레터 써줘"
          rows={4}
          required
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground">
          EXAONE 3.5가 요청을 바탕으로 제목과 본문을 작성합니다.
        </p>
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "AI가 이메일 작성 중…" : "이메일 발송"}
      </Button>
    </form>
  );
}
