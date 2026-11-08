/* Display-only source corrections. Saved story decisions remain unchanged. */
(function(root){'use strict';
const reviewed={
 nuri2013:{time:'적용 배경 2013년 · 설명자료 발표 2019-10-07'},
 support2015:{time:'2015학년도 지원 · 발표 2015-02-24'},
 freezone2019:{title:'읍·면 자유학구제 도입의 연도별 추진 기록',url:'https://www.gbe.kr/opengbe/cm/cntnts/cntntsView.do?cntntsId=947&mi=4328',time:'2019년 추진 기록 · 2021년 6월 말까지의 이행 현황',note:'경북교육청의 2018~2021년 공약 이행표에 초등 읍·면 단위 자유학구제 도입이 기록돼 있습니다. 실제 전입은 당시 지정학교·학구·배정 조건에 따릅니다. 게임의 후보 학교가 모두 지정학교인 것은 아닙니다.'},
 online2020:{time:'적용 2020년 · 발표 2020-03-31'},
 freezone2021:{time:'2021학년도 목록 · 운영학교 공지 2020-12-22'},
 joint2022:{time:'2022년 추진 실적 · 페이지 갱신 2026-02-06'},
 pathways2024:{time:'2024년 추진 실적 · 페이지 갱신 2026-02-06'},
 coexist2024:{time:'2024년 추진 실적 · 페이지 갱신 2026-02-06'},
 career2025:{time:'2025년 학교 밖 교육과정 지정 목록'},
 connect2025:{time:'2025년 추진 실적 · 페이지 갱신 2026-02-06'},
 ucity:{time:'2026년 상반기 점검 · 발표 2026-07-28'},
 admission:{title:'동국대학교 · 2027학년도 수시모집 농어촌학생 요건',time:'2027학년도 모집요강 · 2026년 5월 발행, 6월 공개',note:'이 대학의 예시: 중·고 6년 전 과정 재학과 학생·부모 모두의 해당 지역 거주, 또는 초·중·고 12년 전 과정 재학과 학생 거주 요건을 확인합니다. 이 요강은 과학고·외고·국제고·예술고·체육고·마이스터고 등 특수목적고 및 학력인정 평생교육시설 출신을 제외합니다. 모든 대학에 같은 기준을 적용할 수 없으며, 연속 재학·거주 및 졸업까지의 유지 조건과 예외를 해당 대학 요강으로 확인해야 합니다. 이 게임은 자격이나 합격을 판정하지 않습니다.'},
 carelaw:{time:'현행 조례 시행 2025-05-19 · 현재 참고용'},
 equality:{time:'현행 법령 시행 2026-05-06 · 현재 참고용'},
 declineLaw:{time:'현행 법령 시행 2026-09-10 · 현재 참고용'}
};
function merge(sources){return Object.fromEntries(Object.entries(sources).map(([key,s])=>[key,{...s,...reviewed[key],reviewedAt:reviewed[key]?'2026-11-08':null}]))}
function timeLabel(s){return (s.time||(s.year?s.year+'년 배경 자료':'현재 참고 안내 · 시행·모집 시점은 원문 확인'))+(s.reviewedAt?' · 원문 대조 '+s.reviewedAt:'')+' / 과거·미래에 자동 적용하지 않음'}
const api={merge,timeLabel,reviewed};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LeapPolicyReview=api;
})(typeof window!=='undefined'?window:globalThis);
