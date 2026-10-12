# ESLint · Prettier · Husky 적용 체크리스트

`.prettierrc` 값은 확정된 상태. 아래는 그 외에 남은 작업이다.

## 1. 패키지 설치 (필수)

`.prettierrc`가 `@trivago/prettier-plugin-sort-imports`를 쓰는데, 이 플러그인과 Prettier 본체가 아직 설치되지 않았다. 설치 전에는 `prettier` 실행 자체가 에러가 난다.

```bash
npm i -D prettier eslint-config-prettier @trivago/prettier-plugin-sort-imports
```

## 2. `.husky/pre-commit` 수정 (필수)

현재 내용은 `npm test`인데 `test` 스크립트가 없어서 **모든 커밋이 실패**한다.

```sh
npx lint-staged
```

## 3. lint-staged 설정 추가 (필수)

`package.json`에 추가:

```json
"lint-staged": {
  "*.{ts,tsx,js,mjs}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": "prettier --write"
}
```

## 4. `eslint.config.mjs`에 Prettier 연동 (필수)

ESLint와 Prettier의 포맷 규칙 충돌을 끈다. Next 16 공식 문서(`node_modules/next/dist/docs/01-app/03-api-reference/05-config/03-eslint.md`) 방식.

```js
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier, // 다른 config 뒤에 둬야 충돌 규칙이 꺼진다
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
```

## 5. `package.json` 스크립트 추가 (권장)

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

## 6. `.prettierignore` 추가 (권장)

Prettier는 `.gitignore`를 기본으로 읽으므로 `.next`, `node_modules`는 이미 제외된다. lock 파일만 추가로 제외한다.

```
package-lock.json
```

## 7. `importOrder` 점검 (확인 필요)

현재 순서에 `features`, `providers`가 빠져 있다. 빠진 경로는 맨 끝(`<THIRD_PARTY_MODULES>` 취급이 아닌 미분류 그룹)으로 밀려 순서가 의도와 달라질 수 있다.

- `^@/features`, `^@/providers` 추가 여부와 위치 결정
- `^@/app`: 폴더 규칙상 다른 곳에서 `app/`을 import할 일이 거의 없으므로 빼도 무방
- `^react`는 `react-dom`, `react-hook-form` 같은 패키지도 함께 맞는다. React 본체만 맨 위로 올리려면 `^react$`, `^react-dom`처럼 좁힌다

## 8. 기존 코드 일괄 포맷 (적용 후 1회)

설정 적용 커밋과 포맷 변경 커밋을 분리한다.

```bash
npm run format
```

커밋 메시지: `style: Prettier 일괄 적용`

## 9. 기타 정리

- Node 버전: lint-staged 17은 Node 22.22.1 이상이 필요하다. 팀원 버전이 낮으면 커밋 훅이 깨지므로 `package.json`에 명시하거나 공지

  ```json
  "engines": { "node": ">=22.22.1" }
  ```

- 줄바꿈: `endOfLine: "auto"`라서 CRLF/LF 충돌로 포맷 에러가 나지는 않는다. 다만 저장소 안에 두 방식이 섞일 수 있으니 통일하고 싶다면 `.gitattributes`에 `* text=auto eol=lf`를 추가

## 적용 후 확인

```bash
npm run lint
npm run format:check
```

아무 파일이나 수정해 커밋했을 때 lint-staged가 실행되는지 확인한다.
