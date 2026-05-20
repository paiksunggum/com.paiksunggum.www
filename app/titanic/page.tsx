"use client";

import * as React from "react";
import { FileUp, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACCEPTED_FILE_TYPES =
  ".csv,text/csv,video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm";
const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm"];

type UploadKind = "csv" | "video";

type UploadResult = {
  ok?: boolean;
  error?: string;
  fileName?: string;
  kind?: UploadKind;
  size?: number;
  url?: string;
  lineCount?: number;
  dataRowCount?: number;
};

function getAcceptedKind(file: File): UploadKind | null {
  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith(".csv") || file.type === "text/csv") {
    return "csv";
  }

  if (
    file.type.startsWith("video/") ||
    VIDEO_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
  ) {
    return "video";
  }

  return null;
}

function formatFileSize(size: number | undefined) {
  if (!size) return "0 MB";

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

async function postFile(file: File) {
  const formData = new FormData();
  formData.set("file", file);
  const res = await fetch("/api/upload-file", {
    method: "POST",
    body: formData,
  });
  const data = (await res.json()) as UploadResult;
  if (!res.ok || !data.ok) {
    throw new Error(data.error ?? `업로드 실패 (${res.status})`);
  }
  return data;
}

type UploadUiState = {
  uploading: boolean;
  dragOver: boolean;
  lastUpload: UploadResult | null;
};

const initialUploadUiState: UploadUiState = {
  uploading: false,
  dragOver: false,
  lastUpload: null,
};

export default function TitanicHomePage() {
  const [state, setState] = React.useState<UploadUiState>(initialUploadUiState);
  const panelInputRef = React.useRef<HTMLInputElement>(null);
  const buttonInputRef = React.useRef<HTMLInputElement>(null);

  const patchState = (patch: Partial<UploadUiState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const runUpload = React.useCallback(async (file: File | undefined) => {
    if (!file) return;

    const kind = getAcceptedKind(file);
    if (!kind) {
      toast.error("CSV(.csv) 또는 동영상(.mp4, .mov, .webm)만 업로드할 수 있습니다.");
      return;
    }

    patchState({ uploading: true });
    try {
      const data = await postFile(file);
      patchState({ lastUpload: data });
      try {
        sessionStorage.setItem(
          "lastFileUpload",
          JSON.stringify({
            fileName: data.fileName,
            kind: data.kind,
            size: data.size,
            url: data.url,
            lineCount: data.lineCount,
            dataRowCount: data.dataRowCount,
            uploadedAt: new Date().toISOString(),
          }),
        );
      } catch {
        /* ignore */
      }
      const message =
        data.kind === "csv"
          ? `${data.fileName} 업로드 완료 (데이터 행 약 ${data.dataRowCount}개)`
          : `${data.fileName} 동영상 업로드 완료`;
      toast.success(message);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "업로드에 실패했습니다.");
    } finally {
      patchState({ uploading: false });
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
    patchState({ dragOver: false });
    if (state.uploading) return;
    const f = e.dataTransfer.files[0];
    if (!f) return;
    if (!getAcceptedKind(f)) {
      toast.error("CSV(.csv) 또는 동영상(.mp4, .mov, .webm)만 업로드할 수 있습니다.");
      return;
    }
    void runUpload(f);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-white px-4 py-10 text-neutral-900">
      <h1 className="text-center text-4xl font-bold tracking-tight md:text-6xl">
        포르마
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-500">
        CSV 또는 동영상 파일은 아래{" "}
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
            accept={ACCEPTED_FILE_TYPES}
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            disabled={state.uploading}
            onChange={onPanelFileChange}
          />
          <div
            role="button"
            tabIndex={0}
            aria-label="CSV 또는 동영상 업로드 영역. 클릭하거나 파일을 끌어다 놓으세요."
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!state.uploading) panelInputRef.current?.click();
              }
            }}
            onClick={() => {
              if (!state.uploading) panelInputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!state.uploading) patchState({ dragOver: true });
            }}
            onDragLeave={() => patchState({ dragOver: false })}
            onDrop={onDrop}
            className={cn(
              "cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              state.dragOver
                ? "border-primary bg-primary/5"
                : "border-neutral-300 bg-neutral-50/80 hover:border-neutral-400 hover:bg-neutral-50",
              state.uploading && "pointer-events-none opacity-60",
            )}
          >
            <Upload
              className="mx-auto mb-4 h-12 w-12 text-neutral-400"
              aria-hidden
            />
            <p className="text-base font-medium text-neutral-800">
              CSV 또는 동영상을 여기에 끌어다 놓거나 클릭하세요
            </p>
            <p className="mt-2 text-sm text-neutral-500">
              예: titanic.csv, posture.mp4 — 최대 100MB
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
            accept={ACCEPTED_FILE_TYPES}
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            disabled={state.uploading}
            onChange={onButtonFileChange}
          />
          <Button
            type="button"
            size="lg"
            disabled={state.uploading}
            className="gap-2"
            onClick={() => buttonInputRef.current?.click()}
          >
            <FileUp className="h-5 w-5" aria-hidden />
            {state.uploading ? "업로드 중…" : "파일 선택하여 업로드"}
          </Button>
          <p className="text-center text-xs text-neutral-500">
            버튼을 누르면 탐색기가 열리고, 선택 즉시 서버로 전송됩니다.
          </p>
        </section>

        {state.lastUpload && (
          <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-700">
              최근 업로드
            </p>
            <p className="mt-2 text-sm text-neutral-600">
              {state.lastUpload.fileName} ·{" "}
              {state.lastUpload.kind === "video" ? "동영상" : "CSV"} ·{" "}
              {formatFileSize(state.lastUpload.size)}
            </p>

            {state.lastUpload.kind === "csv" && (
              <p className="mt-2 text-sm text-neutral-500">
                데이터 행 약 {state.lastUpload.dataRowCount ?? 0}개를 확인했습니다.
              </p>
            )}

            {state.lastUpload.kind === "video" && state.lastUpload.url && (
              <video
                controls
                className="mt-4 aspect-video w-full rounded-xl bg-black"
                src={state.lastUpload.url}
              >
                브라우저가 동영상 재생을 지원하지 않습니다.
              </video>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
