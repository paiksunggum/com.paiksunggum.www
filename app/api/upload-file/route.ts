import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);

function getUploadKind(file: File) {
  const ext = path.extname(file.name).toLowerCase();

  if (ext === ".csv" || file.type === "text/csv") {
    return "csv";
  }

  if (file.type.startsWith("video/") || VIDEO_EXTENSIONS.has(ext)) {
    return "video";
  }

  return null;
}

function safeFileName(fileName: string) {
  const parsed = path.parse(fileName);
  const baseName = parsed.name.replace(/[^a-zA-Z0-9_-]+/g, "-") || "upload";
  const ext = parsed.ext.toLowerCase();

  return `${Date.now()}-${randomUUID()}-${baseName}${ext}`;
}

function getCsvCounts(text: string) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);

  return {
    lineCount: lines.length,
    dataRowCount: Math.max(lines.length - 1, 0),
  };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "업로드할 파일을 찾을 수 없습니다." },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { ok: false, error: "파일은 최대 100MB까지 업로드할 수 있습니다." },
      { status: 413 },
    );
  }

  const kind = getUploadKind(file);

  if (!kind) {
    return NextResponse.json(
      {
        ok: false,
        error: "CSV(.csv) 또는 동영상(.mp4, .mov, .webm)만 업로드할 수 있습니다.",
      },
      { status: 400 },
    );
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const storedFileName = safeFileName(file.name);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, storedFileName), bytes);

  const response: {
    ok: true;
    fileName: string;
    kind: "csv" | "video";
    size: number;
    url: string;
    lineCount?: number;
    dataRowCount?: number;
  } = {
    ok: true,
    fileName: file.name,
    kind,
    size: file.size,
    url: `/uploads/${storedFileName}`,
  };

  if (kind === "csv") {
    Object.assign(response, getCsvCounts(bytes.toString("utf8")));
  }

  return NextResponse.json(response);
}
