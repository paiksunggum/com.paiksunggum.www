"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";

import { getApiBase } from "@/lib/api-base";
import { cn } from "@/lib/utils";
import { NavTooltip, navActionClassName } from "@/components/nav-icon-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Gender = "male" | "female" | "none";

function FieldRow({
  icon: Icon,
  children,
  suffix,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <div
      className="flex min-h-[52px] items-center gap-3 border-b border-neutral-200 px-4 last:border-b-0"
    >
      <Icon className="h-5 w-5 shrink-0 text-neutral-400" aria-hidden />
      <div className="flex min-w-0 flex-1 items-center gap-2">{children}</div>
      {suffix}
    </div>
  );
}

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-neutral-200 bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

const fieldInputClass =
  "h-10 w-full min-w-0 border-0 bg-transparent p-0 text-[15px] text-neutral-900 shadow-none outline-none placeholder:text-neutral-400 focus-visible:ring-0";

type SignupDialogProps = {
  isHome: boolean;
};

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

export default function SignupDialog({ isHome }: SignupDialogProps) {
  const router = useRouter();
  const [state, setState] = React.useState<SignupState>(initialSignupState);

  const patchState = (patch: Partial<SignupState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.gender) return;

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData.entries());

    const payload = {
      userId: String(formProps.userId ?? ""),
      password: String(formProps.password ?? ""),
      email: String(formProps.email ?? ""),
      name: String(formProps.name ?? ""),
      birthdate: String(formProps.birthdate ?? ""),
      gender: state.gender,
    };

    try {
      const res = await fetch(`${getApiBase()}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          detail?: string | { msg?: string }[];
        } | null;
        const detail = body?.detail;
        const message = Array.isArray(detail)
          ? detail.map((d) => d.msg).filter(Boolean).join(", ")
          : typeof detail === "string"
            ? detail
            : "회원가입 요청에 실패했습니다.";
        throw new Error(message);
      }

      patchState({ open: false });
      router.push("/");
    } catch (err) {
      const raw =
        err instanceof Error ? err.message : "회원가입 요청에 실패했습니다.";
      const message =
        raw === "Failed to fetch"
          ? "서버에 연결할 수 없습니다. 백엔드(포트 8000)가 실행 중인지 확인해 주세요."
          : raw;
      alert(message);
    }
  }

  return (
    <Dialog
      open={state.open}
      onOpenChange={(open) => patchState({ open })}
    >
      <NavTooltip label="회원가입">
        <DialogTrigger asChild>
          <button
            type="button"
            className={navActionClassName(isHome)}
            aria-label="회원가입"
          >
            <UserPlus className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        </DialogTrigger>
      </NavTooltip>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-neutral-50 p-0 sm:max-w-[460px]">
        <DialogTitle className="sr-only">회원가입</DialogTitle>
        <form onSubmit={handleSignup} className="px-5 pb-6 pt-5">
          <div className="mb-4 flex items-center justify-end gap-1 text-xs text-neutral-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#9a8550]" aria-hidden />
            실명 인증된 아이디로 가입
          </div>

          <Section>
            <FieldRow icon={User}>
              <input
                id="signup-id"
                name="userId"
                type="text"
                autoComplete="username"
                placeholder="아이디"
                className={fieldInputClass}
                required
              />
              <span className="shrink-0 text-[15px] text-neutral-500">
                @naver.com
              </span>
            </FieldRow>
            <FieldRow
              icon={Lock}
              suffix={
                <button
                  type="button"
                  className="shrink-0 text-neutral-400 hover:text-neutral-600"
                  onClick={() =>
                    patchState({ showPassword: !state.showPassword })
                  }
                  aria-label={
                    state.showPassword ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  {state.showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
            >
              <input
                id="signup-password"
                name="password"
                type={state.showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="비밀번호"
                className={fieldInputClass}
                required
              />
            </FieldRow>
            <FieldRow icon={Mail}>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="[선택] 이메일주소 (비밀번호 찾기 등 본인 확인용)"
                className={fieldInputClass}
              />
            </FieldRow>
          </Section>

          <Section className="mt-3">
            <FieldRow icon={User}>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="이름"
                className={fieldInputClass}
                required
              />
            </FieldRow>
            <FieldRow icon={Calendar}>
              <input
                id="signup-birth"
                name="birthdate"
                type="text"
                inputMode="numeric"
                maxLength={8}
                pattern="\d{8}"
                title="생년월일 8자리 (예: 19900101)"
                placeholder="생년월일 8자리"
                className={fieldInputClass}
                required
              />
            </FieldRow>
            <div
              className="flex border-t border-neutral-200"
              role="group"
              aria-label="성별"
            >
              {(
                [
                  { value: "male" as const, label: "남자" },
                  { value: "female" as const, label: "여자" },
                  { value: "none" as const, label: "선택안함" },
                ] as const
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => patchState({ gender: value })}
                  className={cn(
                    "flex h-[52px] flex-1 items-center justify-center border-r border-neutral-200 text-[15px] transition-colors last:border-r-0",
                    state.gender === value
                      ? "bg-[#d4c5a9]/25 font-medium text-neutral-900"
                      : "bg-white text-neutral-600 hover:bg-neutral-50",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </Section>

          <Button
            type="submit"
            className="mt-6 h-[52px] w-full rounded-md text-[17px] font-semibold"
            disabled={!state.gender}
          >
            회원가입 완료
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
