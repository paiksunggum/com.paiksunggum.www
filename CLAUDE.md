# 프론트엔드 규칙

## 폼 입력 — FormData (state에 넣지 않음)

```tsx
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const { userId, password } = Object.fromEntries(formData.entries());
  // fetch ...
};
```

## UI 상태 — 여러 useState → 객체 1개

```tsx
type PageState = { open: boolean; showPassword: boolean; };
const [state, setState] = useState<PageState>({ open: false, showPassword: false });
const patchState = (patch: Partial<PageState>) => setState(prev => ({ ...prev, ...patch }));
```

## API 경로 규칙

Next.js rewrite: `/api/backend/:path*` → `http://api:8000/:path*`

백엔드 titanic 라우터 prefix가 `/api/titanic`이므로 프론트에서 호출 시:

```ts
// 올바른 패턴
fetch("/api/backend/api/titanic/{router}/{endpoint}")

// 잘못된 패턴 (prefix 누락)
fetch("/api/backend/{router}/{endpoint}")
```
