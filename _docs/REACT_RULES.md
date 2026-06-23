# React — useState 최소화 & 상태 객체 압축

> **Cursor 사용법**: 프론트엔드 작업 시 채팅에 `@docs/DevOps/Frontend/REACT_RULES.md` 를 붙이면, 아래 규칙을 매번 타이핑하지 않아도 됩니다.

---

## 에이전트 지시 (자동 적용)

React 컴포넌트를 작성·리팩터할 때 다음을 따른다.

1. **`useState` 호출 수를 최소화**한다. 관련된 UI 상태는 **하나의 객체 state**로 묶는다.
2. **폼 입력값**(userId, password, email 등)은 **개별 `useState`로 두지 않는다**. `<form>` + `name` 속성 + 제출 시 `FormData`로 읽는다.
3. 객체 state 갱신은 **`patchState` 헬퍼**(또는 동일 패턴)로 부분 업데이트한다.
4. 이미 여러 `const [x, setX] = useState(...)` 가 있으면, **관련 필드만** 타입·초기값 객체로 **압축 리팩터**한다. (서로 무관한 단일 boolean 하나는 분리해도 됨)

---

## 원칙

| 구분 | 권장 | 비권장 |
|------|------|--------|
| 폼 필드 | `FormData` + `name` | 필드마다 `useState` |
| 다이얼로그·토글·선택 등 UI | 객체 1개 `useState` | 필드마다 `useState` |
| 서버/비동기 결과 | 필요 시만 별도 state | 모든 것을 state로 |

`useState`를 많이 쓰면 리렌더·의존성·동기화 비용이 커지고, 폼은 **비제어(uncontrolled) + 제출 시 수집**이 더 단순하다.

---

## 폼 제출 — FormData (입력값은 state에 넣지 않음)

```tsx
const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const formProps = Object.fromEntries(formData.entries());

  const payload = {
    userId: String(formProps.userId ?? ""),
    password: String(formProps.password ?? ""),
    email: String(formProps.email ?? ""),
    name: String(formProps.name ?? ""),
    birthdate: String(formProps.birthdate ?? ""),
    gender: state.gender, // UI 전용 값만 객체 state에서
  };

  // fetch ...
};
```

입력 JSX 예시 (`name` 필수):

```tsx
<form onSubmit={handleSignup}>
  <input name="userId" defaultValue="" />
  <input name="password" type="password" />
</form>
```

---

## UI 상태 — 여러 `useState` → 객체 하나로 압축

### Before (비권장)

```tsx
const [open, setOpen] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [gender, setGender] = useState<Gender | null>(null);
```

### After (권장)

```tsx
type SignupState = {
  open: boolean;
  showPassword: boolean;
  gender: Gender | null;
};

const initialSignupState: SignupState = {
  open: false,
  showPassword: false,
  gender: null,
};

const [state, setState] = useState<SignupState>(initialSignupState);

const patchState = (patch: Partial<SignupState>) => {
  setState((prev) => ({ ...prev, ...patch }));
};

// 사용 예
patchState({ open: true });
patchState({ showPassword: !state.showPassword });
patchState({ gender: "male" });
```

### JSX에서의 매핑

| Before | After |
|--------|--------|
| `open` | `state.open` |
| `setOpen(true)` | `patchState({ open: true })` |
| `showPassword` | `state.showPassword` |
| `setGender("male")` | `patchState({ gender: "male" })` |

---

## 프로젝트 참조 구현

`frontend/components/signup-dialog.tsx` — UI만 객체 state, 폼 값은 `FormData`.

---

## 리팩터 체크리스트

- [ ] `useState`가 3개 이상이고 같은 화면/다이얼로그에 묶이면 → **하나의 타입 + `initial*State` + `patchState`**
- [ ] `value` + `onChange`로 모든 input을 묶고 있으면 → **`name` + `FormData` 제출** 검토
- [ ] `gender`처럼 라디오/토글만 실시간 UI에 필요하면 → **객체 state에만** 유지
- [ ] 압축 후에도 **서로 다른 도메인**(예: 전역 테마 vs 폼 UI)은 state를 **분리** 유지
