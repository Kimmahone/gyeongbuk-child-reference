# 파일 구조와 수정 위치

| 파일·폴더 | 역할 |
|---|---|
| `public/index.html` | 시작 문서·스크립트 로딩 순서 |
| `public/app.js` | 화면 그리기, 자동 재생, 선택·모달·저장·결과·인쇄 연결 |
| `public/styles.css` / `print.css` | 반응형 화면 / 미리보기와 A4 인쇄 |
| `public/config.js` | 버전·제작자 닉네임·브랜드 |
| `public/life-engine.js` | 전체 생애 상태·선택·결말·저장 복원 |
| `public/booth-engine.js` | 같은 엔진을 이용한 9결정 짧은 체험 |
| `public/career-content.js` | 실제 기관과 진학 경로를 연결한 주요 결정 |
| `public/story-decisions.js` | 이전 선택에 따른 질문·후속 선택 보완 |
| `public/story-scenes.js` | 지역과 진로를 반영한 성장·성인기 사건 |
| `public/life-consequences.js` | 선택이 통학·가족 생활·다음 경로에 미친 변화 |
| `public/content.js`, `life-content.js`, `regional-content.js` | 기본·생애·지역 이야기 콘텐츠 |
| `public/school-data.js`, `early-data.js`, `data.js` | 학교·영유아기관·지역의 날짜가 있는 데이터 |
| `public/school-model.js`, `early-model.js` | 후보 조회와 수치 설명 |
| `public/policy-review.js` | 정책 원문·시점·조건의 표시 보정 |
| `public/print-passport.js` | 실제 선택을 A4 결과지로 표현 |
| `public/assets/` | 캐릭터·삽화·QR·로컬 폰트 |
| `public/legacy-*` | 과거 진행 기록을 복원하는 호환 코드 |
| `functions/api/school-profile.js` / `server/` | 지정된 학교의 NEIS 기본정보 재조회. 학생 수 실시간 조회가 아님 |
| `tests/` | 분기·연대·자료·복원·인쇄 연결·API 검사 |

## 진행과 저장

전체 체험은 `gbe-learning-path-v4`, 짧은 체험은 `gbe-learning-path-booth-v1` 로컬 저장 키를 사용합니다. 시작 지역·시드·선택 명령을 재생하여 복원하며 전체와 짧은 체험은 별도로 저장합니다. 무작위 결과는 같은 시드·같은 선택에서 재현됩니다.

정책 설명만 고칠 때에는 `policy-review.js`를 활용할 수 있습니다. 선택 ID·순서·상태 변화·기관 후보의 순서를 바꾸면 이미 저장된 인생이 달라질 수 있으므로 과거 엔진 보존과 회귀 검사를 고려하세요.

## 빠르게 수정해 보기

1. `public/config.js`의 닉네임을 바꾸어 알지 머리띠와 결과지에서 확인합니다.
2. 문장과 질문은 `story-scenes.js`, `story-decisions.js`에서 작은 단위로 수정합니다.
3. 같은 출발의 다른 선택으로 다음 질문과 성인기 결말을 비교합니다.
4. `npm run build:pages`로 회귀 검사를 실행합니다.
5. 결과지 미리보기, 좁은 화면, 새로고침 이어하기를 브라우저에서 확인합니다.

데이터를 다시 수집하는 개발자 개인 경로 의존 스크립트는 이 전달본에 넣지 않았습니다. 앱 실행에는 포함된 가공 스냅숏만 있으면 됩니다. 갱신 시 자료의 출처·시점·결측값 처리와 저장 기록의 재현성을 함께 관리해 주세요.
