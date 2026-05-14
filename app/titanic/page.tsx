"use client";

import * as React from "react";
import { FileUp, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

async function postCsv(file: File) {
  const formData = new FormData();
  formData.set("file", file);
  const res = await fetch("/api/upload-csv", {
    method: "POST",
    body: formData,
  });
  const data = (await res.json()) as {
    ok?: boolean;
    error?: string;
    fileName?: string;
    lineCount?: number;
    dataRowCount?: number;
  };
  if (!res.ok || !data.ok) {
    throw new Error(data.error ?? `업로드 실패 (${res.status})`);
  }
  return data;
}

export default function TitanicHomePage() {
  const [uploading, setUploading] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const panelInputRef = React.useRef<HTMLInputElement>(null);
  const buttonInputRef = React.useRef<HTMLInputElement>(null);

  const runUpload = React.useCallback(async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const data = await postCsv(file);
      try {
        sessionStorage.setItem(
          "titanicLastCsvUpload",
          JSON.stringify({
            fileName: data.fileName,
            lineCount: data.lineCount,
            dataRowCount: data.dataRowCount,
            uploadedAt: new Date().toISOString(),
          }),
        );
      } catch {
        /* ignore */
      }
      toast.success(
        `${data.fileName} 업로드 완료 (데이터 행 약 ${data.dataRowCount}개)`,
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }, []);

  const onPanelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    void runUpload(f);
  };

  const onButtonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    void runUpload(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (uploading) return;
    const f = e.dataTransfer.files[0];
    if (!f) return;
    if (!f.name.toLowerCase().endsWith(".csv")) {
      toast.error("CSV(.csv) 파일만 업로드할 수 있습니다.");
      return;
    }
    void runUpload(f);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white px-4 py-10 text-neutral-900">
      <h1 className="text-center text-4xl font-bold tracking-tight md:text-6xl">
        타이타닉 홈
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-500">
        titanic.csv 같은 CSV는 아래{" "}
        <strong className="text-neutral-700">업로드 창</strong>에 끌어다 놓거나
        클릭하거나, <strong className="text-neutral-700">업로드 버튼</strong>으로
        파일을 선택해 업로드할 수 있습니다.
      </p>

      <div className="mx-auto mt-10 flex max-w-xl flex-col gap-10">
        <section aria-labelledby="titanic-upload-panel-title">
          <h2
            id="titanic-upload-panel-title"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-600"
          >
            방식 1 · 업로드 창
          </h2>
          <input
            ref={panelInputRef}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            disabled={uploading}
            onChange={onPanelFileChange}
          />
          <div
            role="button"
            tabIndex={0}
            aria-label="CSV 업로드 영역. 클릭하거나 파일을 끌어다 놓으세요."
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!uploading) panelInputRef.current?.click();
              }
            }}
            onClick={() => {
              if (!uploading) panelInputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!uploading) setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={cn(
              "cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              dragOver
                ? "border-primary bg-primary/5"
                : "border-neutral-300 bg-neutral-50/80 hover:border-neutral-400 hover:bg-neutral-50",
              uploading && "pointer-events-none opacity-60",
            )}
          >
            <Upload
              className="mx-auto mb-4 h-12 w-12 text-neutral-400"
              aria-hidden
            />
            <p className="text-base font-medium text-neutral-800">
              CSV를 여기에 끌어다 놓거나 클릭하세요
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              예: titanic.csv — 최대 15MB
            </p>
          </div>
        </section>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden>
            <span className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-neutral-400">또는</span>
          </div>
        </div>

        <section
          className="flex flex-col items-center gap-3"
          aria-labelledby="titanic-upload-button-title"
        >
          <h2
            id="titanic-upload-button-title"
            className="text-sm font-semibold uppercase tracking-wide text-neutral-600"
          >
            방식 2 · 업로드 버튼
          </h2>
          <input
            ref={buttonInputRef}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            disabled={uploading}
            onChange={onButtonFileChange}
          />
          <Button
            type="button"
            size="lg"
            disabled={uploading}
            className="gap-2"
            onClick={() => buttonInputRef.current?.click()}
          >
            <FileUp className="h-5 w-5" aria-hidden />
            {uploading ? "업로드 중…" : "파일 선택하여 업로드"}
          </Button>
          <p className="text-center text-xs text-neutral-500">
            버튼을 누르면 탐색기가 열리고, 선택 즉시 서버로 전송됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
