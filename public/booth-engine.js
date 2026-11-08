/* Short route v1: separate save format; no unchosen decisions are fabricated. */
(function(root){'use strict';
const load=(f,k)=>typeof module!=='undefined'&&module.exports?require('./'+f+'.js'):root[k];
const F=load('life-engine','LeapLife'),B=load('career-content','LeapCareer');
const AGES=[0,4,7,9,11,13,14,16,18,20,30,70],CORE_AGES=[4,7,9,11,13,14,16,18,20],clone=x=>JSON.parse(JSON.stringify(x));
function create(D,C,L,E,id,seed){const l=F.create(D,C,L,E,id,seed);l.booth=true;return l}
function advance(D,C,L,E,input){const l=clone(input);if(l.pending||l.ended)throw Error('결정을 먼저 마쳐 주세요');l.actions.push({type:'advance'});
if(l.phase===0){F.add(l,F.annual(D,C,L,E,l));l.phase=1}
else if(l.phase===1){if([7,11,14,16,18].includes(l.age))F.add(l,F.context(D,C,L,E,l));l.phase=2}
else if(l.phase===2){l.pending=CORE_AGES.includes(l.age)?B.decision(D,C,L,E,l):null;if(l.pending&&l.age===4){l.pending.title='나의 첫 배움터, 어디가 좋을까?';l.pending.body='가족이 어린이집과 유치원 안내를 함께 펼쳤어요. 매일 오갈 길, 하원 시간과 돌봄을 생각하며 배움터를 골라요.'}l.phase=3}
else{const next=AGES[AGES.indexOf(l.age)+1];if(next===undefined)l.ended=true;else{if(l.g.rural&&l.age<18)l.story.ruralYears+=Math.min(next,18)-l.age;l.age=next;l.phase=0;l.lastOutcome=null;l.lastDelta={}}}return l}
function choose(D,C,L,E,input,id,auto=false){const l=F.choose(D,C,L,E,input,id,auto),next={4:'등하원과 가족의 시간을 살핀 경험을 가지고 초등학교를 골라요.',7:'새 학교에서 보내는 하루를 생각하며 필요한 지원을 골라요.',9:'고른 지원을 이어 가려면 지금 생활권을 지킬지, 이주할지 생각해요.',11:'이 생활 조건을 바탕으로 중학교와 배움의 연결을 골라요.',13:'내 관심을 키우기 위해 다른 학교나 지역의 배움과 연결할 방법을 골라요.',14:'연결한 배움이 고등학교 후보와 준비할 진로에 이어져요.',16:'고른 학교의 생활을 바탕으로 졸업 뒤 진학·일·지역의 길을 비교해요.',18:'비용·일정·가족 생활을 생각하며 스무 살의 첫 진로를 골라요.',20:'이 선택이 어른이 된 뒤의 이야기와 결말로 이어져요.'}[l.age];for(const c of [l.edu.lastChange,l.edu.changes.at(-1),l.lastOutcome?.consequence,l.log.at(-1)?.consequence])if(c&&next)c.next=next;return l}
const pack=l=>({version:'booth-1',origin:l.g.origin,seed:l.g.seed,actions:l.actions,stars:l.stars});
function restore(D,C,L,E,raw){if(raw?.version!=='booth-1'||!Array.isArray(raw.actions)||raw.actions.length>200||!Array.isArray(raw.stars)||raw.stars.length>12)throw Error('부스 기록 형식 오류');let l=create(D,C,L,E,raw.origin,raw.seed);for(const a of raw.actions){if(a.type==='advance')l=advance(D,C,L,E,l);else if(a.type==='choose')l=choose(D,C,L,E,l,a.id,false);else if(a.type==='focus')l=F.focus(l,a.key);else throw Error('기록 명령 오류')}l.stars=[];for(const id of raw.stars){if(typeof id!=='string')throw Error('기록 오류');l=F.star(l,id)}return l}
const api={...F,AGES,CORE_AGES,create,advance,choose,pack,restore};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LeapBooth=api;
})(typeof window!=='undefined'?window:globalThis);
