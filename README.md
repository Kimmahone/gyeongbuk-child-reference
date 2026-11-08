# 경북의 아이 — 나의 배움길

**원작자에게 구현 방향을 전달하기 위한 앱 참고 소스입니다.**
경북의 가상 아이가 학교·지원·이주·진로를 선택하며 성장하고, 마지막에는 실제 학령인구 대시보드로 이어지는 HTML/CSS/JavaScript 이야기 게임입니다.

- [전체 체험 · 14번의 결정](https://gyeongbuk-learning-path.pages.dev/)
- [짧은 체험 · 9번의 결정](https://gyeongbuk-learning-path.pages.dev/?mode=booth)
- **먼저 읽기: [원작자 구현 요청서](docs/DEVELOPMENT_REQUEST.md)**
- [파일 구조와 수정 위치](docs/ARCHITECTURE.md) · [자료의 범위와 시점](docs/DATA_NOTES.md) · [캐릭터·폰트 안내](docs/ASSETS.md)

![앱의 실제 결과 화면](docs/images/result.png)

## 직접 실행

필요 환경: Python 3, 검사 시 Node.js 22 이상. 별도 npm 패키지 설치 없이 실행할 수 있습니다.

```sh
git clone https://github.com/Kimmahone/gyeongbuk-child-reference.git
cd gyeongbuk-child-reference
npm start
```

브라우저에서 `http://127.0.0.1:8766/`를 엽니다. 짧은 체험은 `http://127.0.0.1:8766/?mode=booth`입니다.
`python3` 명령이 없는 환경에서는 `python scripts/serve.py`로 실행하세요. Node.js 없이도 `python3 scripts/serve.py`로 체험할 수 있습니다. 종료는 터미널에서 Ctrl+C입니다. HTML을 더블클릭하는 대신 로컬 서버로 여세요.

```sh
npm run build:pages
```

위 명령은 문법 검사와 자동 테스트를 수행합니다. 앱은 `public/`의 정적 파일을 그대로 서비스하므로 프레임워크 빌드 산출물이나 별도 설치 과정이 없습니다.

## 들어 있는 것

- 지역별 성장·조건부 선택·성인기·결말 엔진
- 실제 기관·학교의 날짜가 있는 데이터와 정책 출처
- 알지·성장 삽화·지도·로컬 폰트
- 결과지 미리보기·A4 인쇄·공개 주소 QR
- 선택·저장 복원·자료 시점·학교 API 자동 검사
- Cloudflare Pages용 설정과 학교 기본정보 조회 함수

성과보고회 PPT·보고서·정산서·회의록·영상 제작안·부스 포스터·진행자 운영 자료는 포함하지 않았습니다. 짧은 체험과 인쇄는 앱 기능이므로 유지했고, 호환성을 위해 주소 매개변수 이름은 `mode=booth`를 유지합니다.

## 참고판과 운영판

현재 참고 기준은 `1.0.0-rc.1`, 2026-11-08입니다. 이 저장소는 앱만 복사한 새 이력이며 기존 운영 저장소의 커밋 이력을 포함하지 않습니다. 위 체험 링크는 기존 운영판이고, 이 전달용 저장소의 변경이 그 주소에 자동 배포되지는 않습니다.

원작자가 별도로 배포할 경우 Cloudflare Pages의 빌드 명령은 `npm run build:pages`, 출력 폴더는 `public`, Node.js는 22로 설정할 수 있습니다. `functions/`와 `server/`는 학교 기본정보를 다시 확인하는 보조 API입니다. 게임 진행에는 외부 API 키가 필요하지 않습니다. 배포 주소를 바꿀 때에는 `public/assets/qr/` 이미지와 `links.json`, 화면·결과지의 링크도 함께 바꿔 주세요.

## 확인 상태

전달용 복사본에서 자동 검사 **47개를 통과했습니다.** 운영 참고판은 작은 화면·가로 화면·저장 복원·완주·결과지 미리보기를 확인했고, 22지역 × 전체/짧은 체험의 결과지 44개가 PDF 렌더러에서 A4 한 쪽으로 나왔습니다. 실제 기기의 모든 브라우저와 프린터, 실제 체험 시간까지 검증한 것은 아닙니다.

실제 입소·배정·입학·지원 자격을 판정하는 서비스가 아닙니다. 데이터 시점과 가상 서사의 경계는 [자료 안내](docs/DATA_NOTES.md)를 참고하세요.
