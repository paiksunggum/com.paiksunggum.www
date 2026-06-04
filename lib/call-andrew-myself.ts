/** 승객 목록 진입·클릭 시 Andrew /myself 호출 (백엔드 3레이어 로그) */
export function callAndrewMyself(): void {
  void fetch("/api/backend/andrew/myself", { cache: "no-store" });
}
