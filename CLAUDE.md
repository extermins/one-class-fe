@AGENTS.md
# 프론트엔드 컨벤션 (학원생 관리 프로젝트)

이 문서는 Notion `프론트엔드 컨벤션` 페이지에서 확정된 규칙만 정리한 것입니다. 아래 규칙을 따라 코드를 작성하고, 규칙에 없는 사항은 임의로 정하지 말고 질문하세요.

## 기술 스택
- Next.js App Router, TypeScript(tsx), TanStack Query
- 모듈 문법은 ES Module(import/export)을 사용

## 브랜치 전략
- 구조: `main` + `dev` + `feat`
- `main`: 배포용 안정 버전. `dev`에서만 병합하며 직접 push 금지
- `dev`: 통합 브랜치. `feat`를 PR로 병합하며 직접 push 금지
- `feat`: 작업 단위 브랜치. `dev`에서 분기하고 작업 후 `dev`로 PR

### 브랜치 이름
- 형식: `타입/이슈번호-설명` (설명은 영문 소문자 kebab-case)
- 이슈번호는 GitHub Issue 발행 번호를 그대로 사용
- 예) `feat/12-student-calendar`, `fix/27-login-redirect`
- 타입은 커밋 타입과 동일하게 사용

### 작업 흐름
1. GitHub에서 Issue 발행 후 번호 확인
2. `dev` 최신화 후 브랜치 생성: `git switch dev && git pull && git switch -c feat/12-student-calendar`
3. 작업·커밋 후 push
4. `dev` 대상 PR 생성
5. 병합 후 feat 브랜치 삭제
6. 배포 시점에 `dev` → `main` PR로 병합

### 병합·보호 규칙 (기본값)
- 병합 방식: Squash and merge
- `main`, `dev`는 PR을 통해서만 반영
- 병합 후 feat 브랜치 삭제
- 리뷰 승인 인원과 CI 통과 필수 여부는 미정. 임의로 정하지 말 것

## Issue 규칙
- 라벨: `feat`(기능), `fix`(버그), `refactor`/`chore`(리팩터링·설정·패키지), `docs`/`design`(문서·UI 스타일)
- 제목: `[타입] 설명` 예) `[feat] 학생 캘린더 일정 조회 기능`
- 작업 시작 전에 Issue를 먼저 발행하고 그 번호를 브랜치명과 PR에 사용
- 유저스토리 티켓(uss, usp, ust, usa, usm) 관련 작업이면 본문에 티켓번호를 함께 적음
- 본문 항목: 작업 내용, 완료 조건, 참고 사항

## PR 규칙
- 제목: `[타입/#이슈번호] 설명` 예) `[feat/#12] 학생 캘린더 일정 조회 구현`
- 대상: feat → dev (기능 작업), dev → main (배포 시점)
- 본문에 `Closes #이슈번호`를 적어 병합 시 Issue가 자동으로 닫히게 함
- 본문 항목: 작업 내용, 변경 사항, 확인 방법(스크린샷 포함), 참고 사항
- 리뷰 없이 병합 가능 (본인이 직접 병합)

## 커밋 컨벤션
- 형식: `타입: 제목` 예) `feat: 학생 캘린더 일정 조회 구현`
- 본문은 필요할 때만 한 줄을 띄우고 작성 (무엇을, 왜 변경했는지 중심)

| 타입 | 설명 |
| --- | --- |
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| refactor | 동작 변경 없는 코드 구조 개선 |
| style | 코드 포맷·세미콜론 등 동작과 무관한 스타일 변경 |
| docs | 문서 추가·수정 |
| chore | 설정·패키지 등 기타 작업 |
| test | 테스트 코드 추가·수정 |
| design | UI 스타일 변경 (CSS 등) |
| rename | 파일·폴더 이름 변경 또는 이동 |
| remove | 파일 삭제 |

### 작성 규칙
- 제목은 한글로 작성하고 50자 이내, 끝에 마침표를 붙이지 않음
- 타입은 영문 소문자, 콜론(:) 뒤에 한 칸 띄우고 제목 작성
- 하나의 커밋에는 하나의 목적만 담음
- 타입은 브랜치명·Issue 라벨의 타입과 동일하게 사용
- 예외) 영문 고유명사·기술 용어(TanStack Query, JWT 등)는 영문 그대로 사용
- 커밋 메시지에는 Issue 번호를 적지 않음. Issue 연결은 PR 본문의 `Closes #이슈번호`로 처리

## 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
| --- | --- | --- |
| 일반 변수 | camelCase | `userName`, `studentList` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `API_BASE_URL` |
| 함수 | camelCase, 동사로 시작 | `getUserList`, `formatDate` |
| 컴포넌트 | PascalCase | `StudentCard`, `ScheduleCalendar` |
| 컴포넌트 파일 | PascalCase | `StudentCard.tsx` |
| 그 외 파일(훅·유틸·API·타입) | camelCase | `useStudentList.ts`, `formatDate.ts`, `student.ts` |
| 폴더 | kebab-case 소문자 | `student-calendar`, `shared-ui` |
| 타입·인터페이스 | PascalCase, 인터페이스 접두사 `I` 금지 | `StudentResponse` |

### 세부 규칙
- boolean 변수는 `is` / `has` / `can` 접두사 (`isLoading`, `hasPermission`, `canEdit`)
- 이벤트 핸들러 함수는 `handle` 접두사 (`handleSubmit`), 컴포넌트 props로 넘기는 이벤트는 `on` 접두사 (`onClick`)
- 커스텀 훅은 `use` 접두사 (`useStudentList`)
- 배열은 복수형 이름 (`students`)
- 한 파일에 메인 컴포넌트 하나, 파일명과 컴포넌트명을 동일하게 사용
- props 타입은 `컴포넌트명Props` (`StudentCardProps`)
- JSX가 있으면 `.tsx`, 없으면 `.ts`
- 여러 개를 담는 폴더는 복수형 (`components`, `hooks`)

### Next.js 예외
- 예약 파일은 규칙을 따르지 않고 소문자 이름 그대로 사용: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`
- 예약 파일의 기본 export 컴포넌트는 역할 중심 이름 사용 (`StudentCalendarPage`)
- 라우트 그룹 `(group-name)`, 동적 경로 `[id]`, 병렬 라우트 `@slot`은 그대로 사용
- 폴더명은 URL 경로가 되므로 kebab-case 소문자
- 환경변수는 UPPER_SNAKE_CASE, 브라우저 공개 변수는 `NEXT_PUBLIC_` 접두사

## 아직 정해지지 않은 항목 (임의로 정하지 말 것)
- 코딩 컨벤션 (포맷팅·린트·TypeScript 규칙·컴포넌트 작성 방식·데이터 패칭 규칙 등)
- 환경 설정 컨벤션, 폴더 구조 컨벤션
- 협업 컨벤션(협업 툴·문서화), 기본 규칙, 회의 규칙
- 병합 시 리뷰 승인 인원, CI 통과 필수 여부

위 항목이 필요한 작업을 만나면 기존 코드의 패턴을 따르되, 새로 정해야 하는 경우에는 사용자에게 먼저 확인하세요.