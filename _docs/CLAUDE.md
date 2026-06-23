상위: [[CLAUDE]]

# 프론트엔드 (www) — Claude 작업 지침

> 이 파일은 `vault/www/CLAUDE.md` ↔ `www/CLAUDE.md` 심볼릭 링크로 동기화됩니다.
> Obsidian에서 편집하면 Claude Code도 같은 내용을 읽습니다.

---

## 프로젝트 구조

```
www/
└── app/                    ← Next.js 14 App Router
    ├── api/                ← Route Handlers (백엔드 프록시 등)
    ├── chat/               ← 채팅 UI
    ├── lesson/             ← 학습 페이지
    ├── recommend/          ← 추천 페이지
    ├── sports/             ← 스포츠 페이지
    └── titanic/            ← 타이타닉 페이지
```

**스택:** Next.js 14 · React 18 · TypeScript · Tailwind CSS · Radix UI

---

## API 경로 규칙

Next.js rewrite: `/api/backend/:path*` → `http://api:8000/:path*`

백엔드 라우터 prefix가 `/api/{domain}`이므로 프론트 호출 시:

```ts
// 올바른 패턴
fetch("/api/backend/api/titanic/{router}/{endpoint}")

// 잘못된 패턴 (prefix 누락)
fetch("/api/backend/{router}/{endpoint}")
```

---

## 폼 입력 — FormData (state에 넣지 않음)

```tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const { userId, password } = Object.fromEntries(formData.entries());
  // fetch ...
};
```

- 입력값을 `useState`로 관리하지 않는다
- `e.currentTarget`을 FormData에 직접 전달한다

---

## UI 상태 — 객체 1개로 통합

```tsx
type PageState = {
  open: boolean;
  showPassword: boolean;
};

const [state, setState] = useState<PageState>({
  open: false,
  showPassword: false,
});

const patchState = (patch: Partial<PageState>) =>
  setState((prev) => ({ ...prev, ...patch }));
```

여러 `useState` 대신 관련 상태를 객체 하나로 묶는다.

---

## 컴포넌트 규칙

- **Server Component 기본**: 클라이언트 상태·이벤트가 필요한 경우만 `"use client"`
- **파일 위치**: 페이지 전용 컴포넌트는 해당 라우트 폴더 안에, 공용은 `components/`
- **Radix UI**: 접근성이 필요한 UI(Dialog, Dropdown 등)에 사용
- **Tailwind**: 인라인 클래스 사용, 별도 CSS 파일 최소화

---

## 데이터 페칭

```tsx
// Server Component — fetch 직접 사용
const data = await fetch("/api/backend/api/titanic/...", {
  cache: "no-store", // 또는 next: { revalidate: N }
}).then((r) => r.json());

// Client Component — SWR 또는 fetch + useEffect
```

- 서버 컴포넌트에서는 `fetch` 직접 사용 (no SWR)
- 클라이언트 상태가 필요한 경우만 `useEffect` 또는 SWR

---

## 타입 규칙

- `any` 사용 금지
- API 응답 타입은 `types/` 또는 해당 페이지 파일 내 명시
- `interface` 보다 `type` 선호 (확장이 필요한 경우 `interface`)

---

## 개발 서버

```bash
npm run dev   # 포트 3000
```

에이전트는 서버를 자동 실행하지 않는다. 사용자 요청 시에만.


## 다크모드 