"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getApiBase } from "@/lib/api-base";

export default function EmailSendForm() {
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const to = String(data.get("to") ?? "").trim();
    const prompt = String(data.get("prompt") ?? "").trim();

    setLoading(true);
    try {
      const res = await fetch(
        `${getApiBase()}/api/automode/email/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to, prompt }),
        },
      );
      if (!res.ok) throw new Error(`서버 오류 (${res.status})`);
      const json = (await res.json()) as { subject: string };
      toast.success(`이메일 발송 완료`, {
        description: `제목: ${json.subject}`,
      });
      form.reset();
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
        <Input
          id="email-to"
          name="to"
          type="email"
          placeholder="someone@example.com"
          required
          disabled={loading}
        />
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
