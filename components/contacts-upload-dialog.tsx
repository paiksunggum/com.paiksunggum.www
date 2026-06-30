"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getApiBase } from "@/lib/api-base";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: () => void;
};

export default function ContactsUploadDialog({
  open,
  onOpenChange,
  onUpload,
}: Props) {
  const [dragOver, setDragOver] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      toast.error("CSV 파일만 업로드할 수 있습니다.");
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(
        `${getApiBase()}/api/automode/juso/contacts/upload`,
        { method: "POST", body: form },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.detail ?? "업로드에 실패했습니다.");
        return;
      }
      const data = await res.json();
      toast.success(`${data.inserted}명이 저장됐습니다.`);
      onUpload();
      onOpenChange(false);
    } catch {
      toast.error("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>주소록 등록</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          구글 주소록 &rarr;{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            연락처 내보내기
          </code>{" "}
          후 CSV 파일을 업로드하세요.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (f) handleFile(f);
          }}
        />
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files[0];
            if (f) handleFile(f);
          }}
          onClick={() => !loading && inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-colors",
            loading
              ? "cursor-not-allowed opacity-50"
              : dragOver
                ? "border-primary bg-primary/5"
                : "border-border bg-muted/30 hover:border-muted-foreground/50",
          )}
        >
          <Upload className="h-10 w-10 text-muted-foreground" aria-hidden />
          <p className="text-sm font-medium">
            {loading ? "업로드 중..." : "CSV 파일을 끌어다 놓거나 클릭하세요"}
          </p>
          <p className="text-xs text-muted-foreground">예: contacts.csv</p>
        </label>
      </DialogContent>
    </Dialog>
  );
}
