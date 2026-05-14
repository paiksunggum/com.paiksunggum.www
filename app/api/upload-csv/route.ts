import { NextRequest, NextResponse } from "next/server";

const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "요청 본문을 읽을 수 없습니다." },
      { status: 400 },
    );
  }

  const entry = formData.get("file");
  if (!(entry instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "파일 필드(file)가 없습니다." },
      { status: 400 },
    );
  }

  if (entry.size === 0) {
    return NextResponse.json(
      { ok: false, error: "빈 파일입니다." },
      { status: 400 },
    );
  }

  if (entry.size > MAX_BYTES) {
    return NextResponse.json(
      { ok: false, error: `파일이 너무 큽니다. (${MAX_BYTES / 1024 / 1024}MB 이하)` },
      { status: 413 },
    );
  }

  if (!entry.name.toLowerCase().endsWith(".csv")) {
    return NextResponse.json(
      { ok: false, error: "CSV 파일(.csv)만 업로드할 수 있습니다." },
      { status: 400 },
    );
  }

  let text: string;
  try {
    text = await entry.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "파일 내용을 읽을 수 없습니다." },
      { status: 400 },
    );
  }

  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const dataRowCount = Math.max(0, lines.length - 1);

  return NextResponse.json({
    ok: true,
    fileName: entry.name,
    size: entry.size,
    lineCount: lines.length,
    dataRowCount,
  });
}
