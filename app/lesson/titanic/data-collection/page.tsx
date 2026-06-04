"use client";

import * as React from "react";
import { FileUp, Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

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
  rowCount?: number;
  inserted?: number;
};

function getAcceptedKind(file: File): UploadKind | null {
  const lowerName = file.name.toLowerCase();
  if (lowerName.endsWith(".csv") || file.type === "text/csv") return "csv";
  if (
    file.type.startsWith("video/") ||
    VIDEO_EXTENSIONS.some((ext) => lowerName.endsWith(ext))
  ) {
    return "video";
  }
  return null;
}

async function postFile(file: File): Promise<UploadResult> {
  const formData = new FormData();
  formData.set("file", file);

  const kind = getAcceptedKind(file);
  const endpoint =
    kind === "csv" ? "/api/backend/titanic/james/fileupload" : "/api/upload-file";

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });
  const raw = await res.text();
  let data: UploadResult & { detail?: string };
  try {
    data = raw ? (JSON.parse(raw) as UploadResult & { detail?: string }) : {};
  } catch {
    throw new Error(raw.trim() || `업로드 실패 (${res.status})`);
  }
  if (!res.ok) {
    const detail =
      typeof data.detail === "string"
        ? data.detail
        : Array.isArray(data.detail)
          ? data.detail.map((d) => d.msg).join(", ")
          : undefined;
    throw new Error(data.error ?? detail ?? `업로드 실패 (${res.status})`);
  }
  if (data.ok === false || data.error) {
    throw new Error(data.error ?? "업로드 실패");
  }
  if (kind === "csv" && data.inserted == null && data.dataRowCount == null) {
    throw new Error(data.error ?? "업로드 실패");
  }
  return {
    ...data,
    ok: data.ok ?? true,
    kind: data.kind ?? kind ?? undefined,
    dataRowCount: data.dataRowCount ?? data.rowCount ?? data.inserted,
  };
}

export default function TitanicDataCollectionPage() {
  const [uploading, setUploading] = React.useState(false);
  const [lastUpload, setLastUpload] = React.useState<UploadResult | null>(null);
  const panelInputRef = React.useRef<HTMLInputElement>(null);
  const buttonInputRef = React.useRef<HTMLInputElement>(null);

  const runUpload = React.useCallback(async (file: File | undefined) => {
    if (!file) return;
    const kind = getAcceptedKind(file);
    if (!kind) {
      toast.error("CSV(.csv) 또는 동영상(.mp4, .mov, .webm)만 업로드할 수 있습니다.");
      return;
    }
    setUploading(true);
    try {
      const data = await postFile(file);
      setLastUpload(data);
      const message =
        data.kind === "csv"
          ? `${data.fileName} 업로드 완료 (데이터 행 약 ${data.dataRowCount}개)`
          : `${data.fileName} 동영상 업로드 완료`;
      toast.success(message);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
          LESSON
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">타이타닉</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          CSV 또는 동영상 파일을 업로드하여 데이터 분석을 진행할 수 있습니다.
          파일은 바로 분석 화면에서 확인할 수 있습니다.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-foreground">방식 1 - 업로드 창</p>
          <input
            ref={panelInputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              void runUpload(f);
            }}
          />
          <div
            className="mt-3 flex min-h-44 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-border bg-card p-6 text-center"
            onClick={() => {
              if (!uploading) panelInputRef.current?.click();
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (uploading) return;
              const f = e.dataTransfer.files?.[0];
              void runUpload(f);
            }}
          >
            <div>
              <Upload
                className="mx-auto mb-3 h-8 w-8 text-muted-foreground"
                aria-hidden
              />
              <p className="text-sm font-semibold">
                CSV 또는 동영상을 여기에 끌어다 놓거나 클릭하세요
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                예: titanic.csv, posture.mp4 - 최대 100MB
              </p>
            </div>
          </div>
        </div>

        <div className="relative text-center">
          <span className="bg-background px-3 text-xs text-muted-foreground">또는</span>
          <div className="-mt-2 border-t border-border" />
        </div>

        <div className="text-center">
          <p className="mb-3 text-sm font-semibold text-foreground">방식 2 - 파일로 버튼</p>
          <input
            ref={buttonInputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            className="sr-only"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              void runUpload(f);
            }}
          />
          <Button
            size="lg"
            className="rounded-full px-6"
            disabled={uploading}
            onClick={() => buttonInputRef.current?.click()}
          >
            <FileUp className="mr-2 h-4 w-4" />
            {uploading ? "업로드 중..." : "파일 선택하여 업로드"}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            버튼을 누르면 파일 찾기가 열리고, 선택 즉시 서버로 전송됩니다.
          </p>
          {lastUpload && (
            <p className="mt-2 text-xs text-foreground">
              최근 업로드: {lastUpload.fileName} ({lastUpload.kind ?? "file"})
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
