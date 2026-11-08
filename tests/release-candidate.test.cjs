const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const S=require('../public/school-model'),R=require('../public/policy-review');
test('RC catalog has usable unique NEIS codes; no future opening school enters historical choices',()=>{
 assert.equal(S.data.schools.length,915);assert.equal(new Set(S.data.schools.map(s=>s.id)).size,915);
 for(const s of S.data.schools)assert.match(s.id,/^\d{7}$/);
 for(const y of [2015,2021,2024])for(const level of ['초등학교','중학교','고등학교'])for(const s of S.available(null,level,y))assert.ok(Number(s.founded.slice(0,4))<=y);
});
test('RC policy corrections distinguish publication from application and do not mutate old source objects',()=>{
 const old={nuri2013:{year:2013,note:'kept'},admission:{url:'https://example.com'}};const next=R.merge(old);
 assert.match(R.timeLabel(next.nuri2013),/2013.*2019/);assert.match(R.timeLabel(next.admission),/2027.*2026/);
 assert.match(next.admission.note,/마이스터고/);assert.match(next.admission.note,/부모 모두/);assert.equal(old.admission.note,undefined);
 assert.match(R.timeLabel({title:'reference'}),/현재 참고 안내/);assert.doesNotMatch(R.timeLabel({}),/2026년 확인 자료/);
});
test('print layout is shared with screen preview and native printing excludes its toolbar',()=>{
 const css=fs.readFileSync('public/print.css','utf8'),html=fs.readFileSync('public/index.html','utf8'),app=fs.readFileSync('public/app.js','utf8');
 assert.match(css,/@page\{size:A4;margin:12mm\}/);assert.match(css,/@media print\{\.print-toolbar\{display:none!important\}/);
 assert.match(html,/id="print-layout"[^>]*media="print"/);assert.match(app,/document.fonts.ready/);assert.match(app,/x.decode\(\)/);assert.match(app,/8000/);
});
