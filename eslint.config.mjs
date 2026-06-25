// [하네스 엔지니어링] ESLint 설정 — Next.js 16 flat config 방식
//
// Next.js 15+ 는 ESLint 9의 flat config (eslint.config.mjs) 를 사용한다.
// 기존 .eslintrc.json 방식은 Next.js 16에서 동작하지 않는다.
//
// 실행:
//   pnpm lint          # eslint .
//   pnpm lint --fix    # 자동 수정

import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Next.js 공식 추천 규칙 + TypeScript 지원 포함
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // console.log 금지 — 운영 환경 로그 유출 방지
      "no-console": "error",

      // any 타입 금지 — 타입 안전성 강제
      "@typescript-eslint/no-explicit-any": "error",

      // 미사용 변수 금지
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
]

export default eslintConfig
