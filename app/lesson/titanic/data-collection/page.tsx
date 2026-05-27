import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function TitanicDataCollectionPage() {
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
          <div className="mt-3 flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-border bg-card p-6 text-center">
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
          <Button size="lg" className="rounded-full px-6">
            파일 선택하여 업로드
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            버튼을 누르면 파일 찾기가 열리고, 선택 즉시 서버로 전송됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
