(function(root){'use strict';
const DATA=typeof module!=='undefined'&&module.exports?require('./school-data.js'):root.LeapSchoolData;
const byId=new Map(DATA.schools.map(s=>[s.id,s]));
function facts(id,year){const s=byId.get(id);if(!s)return null;const h=s.history.find(x=>x[0]===year);const exact=year===2026?s.current:h&&h[1]!=null?{year,students:h[1],classes:h[2]}:null;return{school:s,exact,reference:exact?null:s.current,source:year===2026?'학교알리미 공시 보관본':'교육통계 학교별 연도 집계',checkedAt:DATA.meta.checkedAt.slice(0,10),snapshotDate:DATA.meta.snapshotDate}}
function available(regionId,level,year){return DATA.schools.filter(s=>(!regionId||s.regionId===regionId)&&s.level===level&&/^\d{8}$/.test(s.founded)&&Number(s.founded.slice(0,4))<=year&&(!s.history.some(x=>x[0]===year)||s.history.find(x=>x[0]===year)?.[1]!==0))}
function nearest(D,id,level,year){const r=D.regions.find(r=>r.id===id);return available(null,level,year).sort((a,b)=>{const x=D.regions.find(r=>r.id===a.regionId),y=D.regions.find(r=>r.id===b.regionId);return ((x.lon-r.lon)**2+(x.lat-r.lat)**2)-((y.lon-r.lon)**2+(y.lat-r.lat)**2)||a.id.localeCompare(b.id)})}
function description(id,year){const f=facts(id,year);if(!f)return '학교 자료를 확인하고 경로를 준비해요.';const n=f.exact;if(n)return `${year}년 학생 ${n.students}명 · ${n.classes==null?'학급 수 미확인':n.classes+'학급'}`;return `${year}년 규모 미확인${f.reference?` · 참고: ${f.reference.year}년 ${f.reference.students}명`:''}`}
const api={data:DATA,get:id=>byId.get(id),facts,available,nearest,description};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LeapSchools=api;
})(typeof window!=='undefined'?window:globalThis);
