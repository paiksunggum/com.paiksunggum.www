import { Mail } from "lucide-react";
import EmailSendForm from "@/components/email-send-form";

export const metadata = { title: "이메일 발송 · Forma" };

export default function AutomodePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-primary">
          <Mail className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">AI 이메일 발송</h1>
          <p className="text-sm text-muted-foreground">
            EXAONE 3.5가 이메일을 작성해 Gmail로 발송합니다.
          </p>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <EmailSendForm />
      </div>
    </div>
  );
}
