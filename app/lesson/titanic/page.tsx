export default function TitanicLessonPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground">
          LESSON
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">타이타닉 모델 분석</h1>
      </div>

      <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
        역사 속 가장 유명한 해상사고인 타이타닉 데이터를 통해 생존 패턴을
        살펴봅니다. 데이터를 모으고 탐색한 뒤 모델을 학습해 예측 결과를
        비교해보세요.
      </p>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-base font-bold">학습 목표</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          <li>데이터 수집 및 전처리 기본 습득</li>
          <li>탐색적 데이터 분석(EDA) 흐름 이해</li>
          <li>모델 성능 비교 및 해석 연습</li>
        </ul>
      </div>
    </div>
  );
}
