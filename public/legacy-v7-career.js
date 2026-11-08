(function(root){'use strict';
const S=typeof module!=='undefined'&&module.exports?require('./school-model.js'):root.LeapSchools;
const j=(s,p)=>s+p.split('/')[((s.charCodeAt(s.length-1)-0xAC00)%28)?0:1];
const GOALS={study:'학문·연구',art:'문화·예술',sport:'스포츠·건강',tech:'기술·직업',community:'교육·지역사회',explore:'진로 탐색'};
const opt=(id,title,detail,response,effects={},delta={})=>({id,title,detail,response,effects,delta});
const policies={
 nuri2013:{year:2013,title:'유치원·어린이집의 공통 누리과정',category:'유아교육·보육',status:'당시 시행 배경',note:'2013년 만 3~5세로 확대된 공통 교육·보육 과정입니다. 기관 유형만으로 배움의 질이나 아이의 미래가 정해지지 않습니다. 비용과 이용 시간은 당시 기관·지원 조건을 별도로 확인합니다.',url:'https://www.korea.kr/briefing/policyBriefingView.do?newsId=148865430'},
 freezone2019:{year:2019,title:'작은 학교 자유학구제의 시작',category:'학령인구 감소 대응',status:'시행 이력',note:'경북은 2019년 작은학교 자유학구제를 시작했습니다. 지정된 큰 학교 학구에서 작은 학교로 주소 이전 없이 전입할 기회를 넓히는 제도입니다. 모든 작은 학교가 대상이거나 원하는 학교로 자유롭게 전학하는 제도는 아닙니다.',url:'https://www.gen.go.kr/xboard/board.php?keyset=W_NAME&mode=downpost&number=385896&page=1&sCat=0&searchword=%EC%A0%95%EC%B1%85%EA%B8%B0%ED%9A%8D%EA%B3%BC&tbnum=415'},
 freezone2021:{year:2021,title:'2021 경북 작은 학교 자유학구제 운영학교',category:'학교 선택·통학',status:'공식 연도별 목록',note:'경북교육청이 2021학년도 운영학교와 특색프로그램 자료를 공개했습니다. 실제 전입에는 당시 지정학교·학구·배정 절차 확인이 필요합니다. 이 게임의 학교 목록을 자유학구제 지정 목록으로 보지 않습니다.',url:'https://www.gbe.kr/dep_pol/na/ntt/selectNttList.do?bbsId=2713&mi=18207'},
 joint2022:{year:2022,title:'학교가 함께 여는 경북형 공동교육과정',category:'학령인구 감소 대응',status:'2022 추진 실적',note:'경북의 2022년 실적에는 공동교육과정 79교(급), 경북·대구의 원격 화상 수업이 포함됩니다. 학생이 적어도 학교 간 협력으로 배움의 폭을 넓히는 대응입니다. 개별 학교 참여 여부는 별도 확인합니다.',url:'https://www.gbe.kr/opengbe/cm/cntnts/cntntsView.do?cntntsId=8939&mi=20294'},
 pathways2024:{year:2024,title:'진로·과밀학급·전환기를 함께 지원',category:'경북 교육 여건',status:'2024 추진 실적',note:'경북교육청은 진로진학 상담과 학교급 전환기 자료를 제공하고, 과밀학급 해소도 추진했습니다. 학생 감소 지역과 인구 유입 지역의 교육 과제는 다릅니다. 학교 크기를 교육의 질로 단정하지 않습니다.',url:'https://www.gbe.kr/opengbe/cm/cntnts/cntntsView.do?cntntsId=9005&mi=20294'},
 coexist2024:{year:2024,title:'작은학교·도농 협력·마을학교',category:'학령인구 감소 대응',status:'2024 추진 실적',note:'작은 학교 자유학구제, 도농 어울림 학교, 공동수업과 원격 화상 수업, 마을학교가 함께 추진됐습니다. 이사는 하나의 방법이며 현재 지역에 남아 다른 학교·마을과 연결하는 방법도 있습니다.',url:'https://www.gbe.kr/opengbe/cm/cntnts/cntntsView.do?cntntsId=9006&mi=20294'},
 career2025:{year:2025,title:'직업계고 학교 밖 교육과정',category:'진로맞춤 배움',status:'연도별 지정 자료',note:'2025 지정 목록에는 구미의 반도체·항공기 정비, 포항의 반도체공정 등 학교 밖 교육과정이 있습니다. 직업계고 학생의 학교·학년·모집 조건에 따라 참여합니다. 학교마다 모든 과정이 열리지는 않습니다.',url:'https://www.gbe.kr/goodjob/cm/cntnts/cntntsView.do?cntntsId=7926&mi=18684'},
 connect2025:{year:2025,title:'도농 이음교실과 다양한 배움의 연결',category:'학령인구 감소 대응',status:'2025 추진 실적',note:'경북의 2025 실적에는 도농 이음교실, 초·중 연계, 원격 화상 수업, 마을학교와 예술·체육 지원이 담겨 있습니다. 소속 학교가 작다는 이유만으로 진로를 좁히지 않고 연계 기회를 확인합니다.',url:'https://www.gbe.kr/opengbe/cm/cntnts/cntntsView.do?cntntsId=9445&mi=20294'}
};
function schoolOption(s,l,label,mode,track){const moved=s.regionId!==l.g.regionId,year=2008+l.age;return {...opt('school-'+s.id,label+' · '+s.name,S.description(s.id,year)+(moved?' · 지역 이동':' · 현재 지역'),`${j(s.name,'을/를')} 배움터로 삼는 가상의 경로를 골랐어요. ${moved?'가족과 이주·거주 계획을 다시 세우고 새 지역에서 생활하기로 했어요.':'지금 지역에 머물며 통학과 방과후 일정을 맞추기로 했어요.'} 실제 입학·배정이 확정된 것은 아니에요.`,{schoolId:s.id,schoolMode:mode,track:track||l.story.track,...(moved?{move:s.regionId}:{})},{agency:3,bond:moved?-2:2,rest:moved?-2:1}),schoolId:s.id,local:!moved}}
function chooseSchools(D,l,level){const year=2008+l.age,local=S.available(l.g.regionId,level,year),near=S.nearest(D,l.g.regionId,level,year),picked=[];
const add=(s,label,mode,track)=>{if(s&&!picked.some(o=>o.schoolId===s.id))picked.push(schoolOption(s,l,label,mode,track))};
if(level==='고등학교'){
 const arts=x=>/예술/.test(x.name)&&!x.name.startsWith('학력인정');const sports=x=>/체육/.test(x.name);const voc=x=>x.category==='전문계'&&!arts(x);const gen=x=>!arts(x)&&!sports(x)&&x.category==='일반계'&&x.type!=='특목고';
 const categories=l.edu.goal==='art'?[['예술 진학 준비',arts,'expression'],['교과와 예술 병행',gen,'general'],['기술·표현 함께 배우기',voc,'workshop']]:l.edu.goal==='sport'?[['체육 진학 준비',sports,'sport'],['교과와 운동 병행',gen,'general'],['다른 전문기술 탐색',voc,'workshop']]:l.edu.goal==='tech'?[['직업교육으로 진로 준비',voc,'workshop'],['일반교과로 진학 준비',gen,'general'],['예술 계열도 비교하기',arts,'expression']]:[['일반교과로 진학 준비',gen,'general'],['직업교육으로 진로 준비',voc,'workshop'],['예술 계열로 방향 전환',arts,'expression']];
 for(const[label,test,track]of categories)add(near.find(test),label,'high',track);
 add(near.find(x=>sports(x)&&!picked.some(o=>o.schoolId===x.id)),'체육 계열도 비교하기','high','sport');
 add(near.find(x=>gen(x)&&x.regionId!==l.g.regionId&&!picked.some(o=>o.schoolId===x.id)),'다른 지역 일반고 준비','high','general');
}else{
 const measured=local.filter(x=>S.facts(x.id,year)?.exact?.students!=null).sort((a,b)=>S.facts(a.id,year).exact.students-S.facts(b.id,year).exact.students);
 add(local.find(x=>x.rural),'읍·면 생활권에서 다니기','rural');
 add(local.find(x=>!x.rural),'동 생활권에서 다니기','town');
 add(measured[0]||local.find(x=>!picked.some(o=>o.schoolId===x.id)),'또 다른 배움터 비교하기','local');
 add(near.find(x=>x.regionId!==l.g.regionId&&x.rural),'가족과 다른 읍·면으로 이주','move-rural');
 add(near.find(x=>x.regionId!==l.g.regionId&&!x.rural),'가족과 다른 도시로 이주','move-city');
}
for(const x of near)if(picked.length<5)add(x,'다른 학교와 생활 여건 비교','compare');
return picked.slice(0,5)}
function decision(D,C,L,E,l){const s=l.story,u=l.edu,a=l.age,r=E.regionOf(D,l.g),school=S.get(u.schoolId),sc=(id,title,body,options,source)=>({id:'career7-'+id+'-'+r.id,title,body,options,source,type:'career'}),o=opt;
if(a===1)return sc('care','처음 돌봄을 어디에서 이어 갈까?',`${r.name}에서 시작한 하루. 이번에는 보호자가 되어 돌봄과 일·이동의 균형을 정해요.`,[
o('care-center','집 근처 어린이집을 알아보기','등·하원 동선을 우선. 다음에는 기관 이용시간을 비교해요.','입소 가능 여부를 확인할 어린이집을 찾아봤어요. 익숙한 생활권을 유지하며 등·하원 계획을 만들었어요.',{care:'center',support:'돌봄기관 상담'},{bond:3}),
o('care-work','보호자의 일터 가까운 어린이집 찾기','이동은 길어져도 퇴근과 하원을 맞추는 길.','아이와 보호자의 하루를 함께 그렸어요. 출퇴근 동선에 맞는 기관을 비교하기로 했어요.',{care:'work',commute:'long'},{agency:3,rest:-2}),
o('care-family','가족이 돌봄 시간을 나누기','기관 선택을 서두르지 않고 돌봄 시간을 조정해요.','가족과 가까운 어른들이 가능한 시간을 나누었어요. 혼자 감당하기 어려운 시간은 따로 도움을 찾기로 했어요.',{care:'family',support:'가족 돌봄 협의'},{bond:4}),
o('care-move','돌봄을 도울 가족 가까이 이주 준비','집과 보호자의 일을 함께 조정. 이후 생활 선택에 반영돼요.','도움을 주고받을 수 있는 거리로 생활을 옮기는 계획을 세웠어요. 비용과 일의 변화도 함께 적었어요.',{care:'relatives',housing:'family-near',support:'가족 연결'},{rest:3,agency:2})]);
if(a===4)return sc('preschool-'+u.care,'어린이집을 이어 갈까, 유치원으로 갈까?',`${u.care==='family'?'가족과 보내던 시간에서 또래를 만나는 시간을 늘리려 해요.':u.care==='work'?'보호자의 퇴근과 아이의 하원 시간을 다시 맞춰야 해요.':'익숙한 돌봄과 새로운 배움터 사이에서 고민해요.'} 유형별 일과·통학·비용을 비교해요.`,[
o('pre-stay','어린이집에서 보육을 이어 가기','익숙한 일과를 유지하고 보호자의 근무 시간을 맞춰요.','다니던 어린이집 또는 이용 가능한 어린이집의 일과를 확인했어요. 유치원으로 옮기지 않는 길을 골랐어요.',{preschool:'어린이집',care:'center'},{rest:3,bond:2}),
o('pre-public','공립 병설유치원으로 옮기기','학교 생활권·교육시간·방과후 운영을 함께 확인해요.','공립 병설유치원 입학과 돌봄 시간을 상담하기로 했어요. 초등학교까지 이어지는 생활권을 먼저 살펴봤어요.',{preschool:'공립 병설유치원',care:'school'},{curiosity:3}),
o('pre-single','공립 단설유치원을 알아보기','유아 전용 환경과 통학 여건을 함께 비교해요.','지역에 있는지부터 확인하고 원아 모집과 통학 방법을 알아보기로 했어요.',{preschool:'공립 단설유치원',commute:'review'},{agency:3}),
o('pre-private','사립유치원 교육·비용을 비교하기','선택한 교육방향과 실제 부담 비용을 함께 따져요.','교육내용을 살피고 지원 적용 뒤에도 남는 비용과 이용 시간을 물어보기로 했어요.',{preschool:'사립유치원',funding:'비용 비교'},{curiosity:3,rest:-1}),
o('pre-near','기관보다 짧은 통학과 돌봄 연결 우선','유형을 열어 두고 아이와 가족의 생활에 맞춰요.','가까운 기관을 먼저 비교하고 하원 후 돌봄을 연결했어요. 이름보다 매일의 생활을 기준으로 골랐어요.',{preschool:'생활권 중심 기관',care:'near'},{rest:4})]);
if(a===7)return sc('elementary','첫 초등학교, 어디에서 살아가며 다닐까?',`${r.name}와 가까운 지역의 실제 학교를 비교해요. 학교 선택은 가상의 진학 희망이며 실제 배정은 주소·학구와 절차를 따릅니다.`,chooseSchools(D,l,'초등학교'),'support2015');
if(a===9)return sc('support-'+u.care,'학교생활을 이어 줄 지원, 무엇부터?',`${school?.name||r.name+'의 학교'}에서 배움과 생활을 이어 가요. ${u.commute==='long'?'이동이 길어 하교 뒤 시간이 빠듯해요.':u.care==='school'?'유치원 때와 달라진 하교 시간에 맞춘 돌봄이 필요해요.':'가족의 일정과 공부·예체능 관심을 함께 맞춰야 해요.'} 한 가지를 먼저 챙기면 다음 고민이 달라집니다.`,[
o('support-care','방과후 돌봄과 하원 연결부터','가족 일정의 여유를 만들고 공부·예체능 선택은 열어 둬요.','학교와 보호자가 이용 가능한 돌봄과 인계 시간을 맞추는 계획을 세웠어요.',{support:'돌봄·하원 연결',goal:'explore',carePriority:true},{rest:5,bond:2}),
o('support-study','학습 도움과 교육비 상담부터','학업 쪽 관심을 키우되 지원 선정 조건을 확인해요.','막힌 공부를 도울 방법과 교육비 지원 신청을 상담했어요. 지원은 자동으로 확정되는 것이 아니에요.',{support:'학습·교육비 상담',goal:'study'},{curiosity:5}),
o('support-art','예술 교육의 비용·이동 지원 찾기','표현 분야를 준비하고 뒤에 예술 진학 고민이 열려요.','재료비와 연습 장소, 이동을 함께 살폈어요. 표현 분야를 더 배우고 싶은 마음이 커졌어요.',{support:'예술 배움 연결',goal:'art'},{agency:4,rest:-1}),
o('support-sport','운동을 지속할 시간·생활 지원 찾기','학업과 훈련의 균형을 먼저 정하고 체육 진로를 탐색해요.','훈련뿐 아니라 수업과 회복 시간도 지킬 수 있는 생활을 준비했어요.',{support:'체육·생활 균형',goal:'sport'},{energy:4,bond:2}),
o('support-local','지역 자원과 통학 여건을 먼저 찾기','현재 지역에 남아 학교 밖 배움을 연결해요.','도서관과 지역 배움터를 오갈 수 있는 방법을 가족과 찾았어요.',{support:'지역 배움·이동',goal:'community',network:'local'},{bond:4,agency:2})]);
if(a===11)return sc('mobility-'+u.goal,'학교를 옮길까, 지금 학교의 길을 넓힐까?',`${GOALS[u.goal]}에 관심이 생겼어요. 학생 수가 달라지는 지역에서 학교 선택과 이동을 다시 생각해요. 자유학구제는 지정 학구·학교의 조건부터 확인합니다.`,[
o('move-stay','지금 학교에 남아 필요한 배움 연결','친구·생활권을 유지. 중학교도 현재 지역부터 비교해요.','학교를 옮기지 않고 필요한 배움과 지원을 상담하기로 했어요.',{mobility:'stay',network:'connected'},{bond:4}),
o('move-zone','작은학교 자유학구제 전입 상담','주소를 옮기지 않는 선택 가능성을 확인. 지정 여부 확인 전에는 전학하지 않아요.','당시 지정학교와 우리 집 학구의 전입 가능 여부를 알아보기로 했어요. 상담 단계라 학교는 아직 바뀌지 않았어요.',{mobility:'freezone-review',support:'자유학구제 상담'},{agency:3}),
...S.nearest(D,r.id,'초등학교',2019).filter(x=>x.regionId!==r.id).filter((x,i,a)=>a.findIndex(y=>y.regionId===x.regionId)===i).slice(0,2).map((x,i)=>schoolOption(x,l,i?'다른 지역의 학교로 가족 이주':'인근 지역의 학교로 가족 이주','transfer')),
o('move-prepare','이사는 미루고 통학·주거부터 준비','곧바로 바꾸지 않고 다음 중학교 선택에 여유를 남겨요.','통학과 거주 비용, 가족의 일을 적어 보니 준비할 것이 보였어요. 중학교 진학 때 다시 비교하기로 했어요.',{mobility:'prepare',housing:'이주 준비'},{rest:3,agency:2})],'freezone2019');
if(a===12)return sc('remote-'+u.goal,'집에서 배우는 시간, 무엇이 먼저 필요할까?','2020년, 온라인 개학으로 공부와 돌봄의 방식이 달라졌어요. 필요한 지원을 말하는 것도 진로를 지키는 선택이에요.',[
o('remote-device','기기·통신을 학교와 먼저 상담','접속 여건을 갖추고 수업 참여를 이어 가요.','쓸 수 있는 기기와 연결 상태를 알려 도움받을 방법을 상담했어요.',{learning:'supported',support:'디지털 접근 상담'},{agency:3}),
o('remote-paper','학습자료와 전화 도움을 연결','화면만 고집하지 않고 가능한 방식으로 배워요.','학습자료를 나누고 질문할 시간을 정했어요. 배움에 들어오는 길은 한 가지가 아니었어요.',{learning:'paper',support:'학습자료 연결'},{rest:3}),
o('remote-study','공부 일정을 스스로 나누기','교과 공부를 우선하고 혼자 막힌 부분은 질문해요.','작은 공부 시간을 정하고 못 푼 질문을 남겼어요.',{learning:'self',goal:'study'},{curiosity:4}),
o('remote-expression',u.goal==='sport'?'수업과 안전한 몸 훈련을 나누기':'수업과 예술 연습 시간을 나누기','좋아하는 진로를 놓지 않고 일과 안에 함께 넣어요.','교과 수업을 마친 뒤 가능한 연습을 골랐어요. 무리하지 않는 범위에서 기록을 남겼어요.',{learning:'balanced',goal:u.goal==='sport'?'sport':'art'},{energy:2,agency:2}),
o('remote-care','돌봄·마음 상담을 먼저 요청','생활 리듬을 회복하고 배움을 이어 갈 여유를 만들어요.','혼자 버티지 않고 도움이 필요한 시간을 알렸어요.',{learning:'care',support:'돌봄·상담'},{rest:5})],'online2020');
if(a===13)return sc('middle-'+u.mobility,'중학교, 어떤 생활권으로 이어 갈까?',`${u.mobility==='freezone-review'?'초등학교 때 알아본 자유학구제 경험을 바탕으로 중학교 지정·배정 조건도 확인해요.':u.mobility==='prepare'?'미뤄 둔 이주 계획을 다시 펼쳤어요.':'초등학교의 경험을 안고 새 학교를 비교해요.'} 학생 수·통학·가족 생활을 함께 보고 희망 경로를 고릅니다.`,chooseSchools(D,l,'중학교'),'freezone2021');
if(a===14)return sc('connection-'+u.goal,'배우고 싶은 것이 우리 학교에 없다면?',`${school?.name||'중학교'}에서 ${GOALS[u.goal]}의 다음 단계를 생각해요. 다른 학교와 연결할지, 이주를 준비할지, 관심을 바꿀지 고를 수 있어요.`,[
o('connect-joint','학교 간 공동교육과정부터 상담','현재 지역을 유지하며 다른 학교의 배움과 연결해요.','공동교육과정 참여 학교와 열리는 과목을 상담했어요. 이주 대신 학교 간 연결을 먼저 찾기로 했어요.',{network:'joint',mobility:'stay'},{curiosity:4,bond:2}),
o('connect-city','진로에 맞는 고교가 있는 지역으로 이주 준비','고교 선택에서 타 지역 생활을 우선 검토해요.','가족과 고교 주변의 주거·통학을 알아봤어요. 이동의 기대와 부담을 함께 준비했어요.',{mobility:'career-move',housing:'고교 이주 준비'},{agency:4,rest:-2}),
o('connect-remote','원격 배움과 지역 생활 병행','통학을 늘리지 않고 연결 가능한 수업을 알아봐요.','참여할 수 있는 원격 배움이 있는지 선생님과 확인했어요.',{network:'remote',mobility:'stay'},{curiosity:3,rest:2}),
o('connect-voc',`${r.name}의 ${C.regions[r.id].school?.field||C.regions[r.id].theme}와 진로 연결`,'고교 진학을 취업·후학습까지 연결해 생각해요.',`${r.name}의 ${C.regions[r.id].theme}에서 관심을 찾고 실제 직업계고 교육과정을 따로 비교하기로 했어요. 현재 지역이 모든 진로를 제공한다는 뜻은 아니며 다른 지역의 학교도 함께 살펴봐요.`,{goal:'tech',network:'vocational'},{agency:4}),
o('connect-reset','지금 관심을 내려놓고 진로 상담','이전 선택을 취소할 수 있어요. 다음에는 다섯 진로를 다시 비교해요.','좋아했던 일이 꼭 직업이어야 하는지 생각했어요. 잘못 고른 것이 아니라 다시 살필 시간을 만든 거예요.',{goal:'explore',network:'counsel'},{rest:5})],'joint2022');
if(a===15)return sc('goal-'+u.goal,'이제, 어떤 진로에 시간을 더 쓸까?',`${GOALS[u.goal]}에 대한 경험과 ${u.mobility==='career-move'?'이주 준비':'현재 생활권'}를 돌아봐요. 선택에 따라 고교 비교 순서와 다음 학년의 고민이 달라집니다.`,[
o('goal-study','학문·대학 공부를 중심에 두기','일반교과 → 전공 탐색 → 진학·연구의 길.','더 깊이 공부할 과목을 고르고 일반교과 중심 고교부터 비교하기로 했어요.',{goal:'study'},{curiosity:5}),
o('goal-art','예술을 진로로 준비하기','예술고·일반고 병행 경로 → 실기·작품 → 다양한 문화 직업.','표현을 좋아하는 마음에 실제 준비가 더해졌어요. 작품 준비와 교과 공부를 함께 계획했어요.',{goal:'art'},{agency:5}),
o('goal-sport','체육·건강 분야로 준비하기','체육고·일반고 병행 경로 → 훈련·학업 → 선수와 비선수 직업.','운동 능력만으로 미래를 정하지 않고 학업·훈련·회복을 함께 준비하기로 했어요.',{goal:'sport'},{energy:4,agency:2}),
o('goal-tech','기술·직업교육으로 준비하기','직업계고 → 기술·자격 → 취업과 후학습.','실습이 많은 교육과정과 안전한 현장 배움, 나중에 공부를 이어갈 길을 찾아봤어요.',{goal:'tech'},{agency:5}),
o('goal-community','사람·지역을 돕는 분야 탐색하기','교육·돌봄·환경·공공 분야로 이어지는 폭넓은 배움.','지역에서 만난 사람들의 일을 듣고 어떤 공부와 자격이 필요한지 정리했어요.',{goal:'community'},{bond:5})]);
if(a===16)return sc('high-'+u.goal,'고등학교, 진로와 생활을 함께 고르기',`${j(GOALS[u.goal],'을/를')} 준비할 실제 학교 후보입니다. 학교명·유형은 현재 기준이며 해당 연도의 학교 규모를 별도로 표시합니다. 입학·전공·실기·거주 조건은 학교별 확인이 필요합니다.`,chooseSchools(D,l,'고등학교'),'pathways2024');
if(a===17){const t=s.track,art=t==='expression',sport=t==='sport',tech=t==='workshop';return sc('senior-'+t,art?'실기와 진학, 어떤 길을 준비할까?':sport?'선수의 길과 그 밖의 스포츠 진로':tech?'배운 기술을 어디로 연결할까?':'교과 공부를 어떤 미래와 연결할까?',`${school?.name||'고등학교'}에서 ${u.support||'주변의 도움'}을 발판으로 다음 경로를 고릅니다. 학교가 바뀌면서 준비할 것과 선택의 결과도 달라졌어요.`,[
o('senior-major',art?'작품·실기 전형 중심 진학 준비':sport?'선수 진학을 학업과 함께 준비':tech?'기술 전공의 대학·전문대 진학 준비':'관심 전공의 대학 진학 준비','깊게 배우는 방향. 다음에는 생활비·지원·진학을 함께 비교해요.','진학에 필요한 실제 모집 요건을 확인할 목록을 만들었어요. 부족한 준비는 상담하며 채우기로 했어요.',{route:'study',preparation:'major'},{curiosity:5}),
o('senior-field',art?'디자인·콘텐츠 실무로 넓히기':sport?'스포츠 지도·건강 분야로 전환':tech?'취업과 후학습을 함께 준비':'지역 산업·직업교육으로 전환','배우는 분야와 첫 직업 경로를 바꿉니다.','처음 그린 직업 하나를 넘어 관련된 다른 일을 찾아봤어요. 필요한 교육·자격을 새로 정리했어요.',{route:'work',preparation:'field',goal:art?'art':sport?'sport':'tech'},{agency:5}),
o('senior-network',tech?'학교 밖 교육과정 참여 조건 상담':'다른 학교·지역의 배움과 연결','소속 학교를 유지하며 부족한 과목·경험을 보완해요.','열리는 과정과 대상 학년을 확인할 상담을 신청했어요. 개인에게 자동 제공되는 지원은 아니에요.',{network:'extended',preparation:'network',route:'study'},{bond:3,curiosity:3}),
o('senior-reset','준비하던 진로를 바꾸기','지금까지의 경험은 남기고 다른 전공·직업을 탐색해요.','미련과 새 관심을 함께 적었어요. 이미 쓴 시간 때문에 원하지 않는 길을 계속하지 않기로 했어요.',{goal:'explore',route:'explore',preparation:'reset'},{rest:5}),
o('senior-local','지역에서 일·배움을 함께 찾기','떠나는 길뿐 아니라 남아서 배우는 경로를 준비해요.','지역 안의 교육과 일자리를 구분해 찾아봤어요. 어느 하나를 곧바로 보장받은 것은 아니에요.',{route:'local',preparation:'local'},{bond:4,agency:2})],tech?'career2025':'connect2025')}
if(a===18)return sc('graduation-'+u.goal,'열여덟, 졸업 뒤의 생활을 설계하기',`${j(GOALS[u.goal],'과/와')} ${u.preparation==='field'?'현장 준비':u.preparation==='reset'?'새 진로 탐색':'진학 준비'}가 다음 페이지를 만들고 있어요. 진로뿐 아니라 어디에서 살고 어떤 지원을 알아볼지도 함께 골라요.`,[
o('after-study','대학·전문대 진학과 주거·장학 상담','공부를 이어 가며 실제 비용과 지원 자격을 확인해요.','배울 전공과 생활비, 장학·주거 지원 조건을 따로 적었어요.',{route:'study',funding:'장학·주거 상담',housing:'진학 생활 준비'},{curiosity:4}),
o('after-work',u.goal==='art'?'문화·콘텐츠 실무와 후학습 준비':u.goal==='sport'?'스포츠·건강 직무교육 준비':'직무교육·취업과 후학습 준비','일을 배우면서 계속 공부할 경로를 남겨요.','첫 일자리만 보지 않고 훈련·안전·계약과 다음 배움을 함께 확인하기로 했어요.',{route:'work',funding:'직무교육 정보'},{agency:4}),
o('after-local','지역에 남아 대학·산업 연결 살피기','K-U시티 등 실제 교육과정·모집·거주 조건부터 비교해요.','지역 대학·산업과 연결된 교육을 알아보기로 했어요. 입학이나 채용을 약속받은 것은 아니에요.',{route:'local',funding:'지역 교육·정주 정보',housing:'지역 생활 유지'},{bond:4}),
(l.g.rural||u.schoolHistory.some(x=>S.get(x.id)?.rural))?o('after-rural','농어촌학생 전형의 이력 요건 상담','재학·거주·부모 거주·대학별 기준을 함께 대조해요.','농어촌 학교를 선택했던 이력이 있어 상담 목록에 넣었어요. 학교 위치나 게임의 재학 기간만으로 지원 자격·합격을 판정하지 않아요.',{route:'study',funding:'농어촌 전형 이력 상담'},{agency:3}):o('after-art',u.goal==='sport'?'스포츠 분야의 비선수 진로 탐색':'창작·프로젝트와 학습 병행','당장 진학·취업으로 확정하지 않고 작은 실무를 경험해요.','생활을 유지할 방법을 함께 마련하며 작은 프로젝트로 경험을 쌓기로 했어요.',{route:'project',funding:'생활·프로젝트 계획'},{agency:3}),
o('after-gap','탐색 기간을 정하고 다시 준비하기','기간·생활비·상담 계획을 정해 다음 기회를 준비해요.','막연히 미루지 않고 다시 결정할 날짜와 생활 계획을 적었어요.',{route:'explore',funding:'탐색 생활 계획'},{rest:4})],'ucity');
if(a===19){const problem=['주거·이동 비용이 예상보다 커졌어요','계획한 과정과 실제 모집 일정이 달라요','가족과 보내는 시간도 지키고 싶어요'][(l.g.seed>>>2)%3];return sc('reality-'+s.route,problem,`${s.route==='study'?'진학':s.route==='work'?'일과 훈련':s.route==='local'?'지역 생활':'새 진로'}를 준비하며 생긴 가상의 현실 고민입니다. 원하는 길을 계속할지, 장소나 일정을 바꿀지 고릅니다.`,[
o('real-support','조건에 맞는 지원·상담부터 찾기','경로를 유지하고 준비 기간을 더 확보해요.','확인되지 않은 지원을 미리 계산하지 않고 실제 자격과 일정을 문의하기로 했어요.',{adjustment:'support',path:'continue'},{agency:3}),
o('real-near','가까운 교육·일자리로 방향 바꾸기','장거리 이동을 줄이고 지역에 머무는 경로로 바뀝니다.','처음 계획한 장소를 바꾸고 가까운 곳에서 이어갈 길을 골랐어요.',{route:'local',adjustment:'near',path:'local',housing:'지역 생활 유지'},{rest:4,bond:2}),
o('real-work','일과 학습을 나누어 병행하기','공부만 하던 길이라면 일과 후학습 경로로 전환돼요.','배움에 걸리는 시간을 늘리더라도 생활을 함께 꾸리는 길을 택했어요.',{route:'work',adjustment:'parttime',path:'balance'},{agency:4,rest:-2}),
o('real-restart','다른 전공·직업으로 다시 시작하기','이전 진로를 수정. 스무 살의 선택지가 새 분야로 열려요.','처음의 꿈을 꼭 같은 직업으로 실현할 필요는 없다고 생각했어요.',{goal:'explore',route:'explore',adjustment:'restart',path:'restart'},{curiosity:4}),
o('real-pause','일정을 늦추고 생활을 먼저 안정시키기','다음 계획을 작은 단위로 조정해요. 실패로 처리하지 않습니다.','회복하고 준비할 시간을 확보했어요. 멈춘 시간도 내 삶의 한 부분이 되었어요.',{adjustment:'pause',path:'balance'},{rest:5})])}
if(a===20){const table={study:[['science','연구·분석을 배우는 길'],['people','교육과 상담을 준비하는 길'],['tech','기술과 데이터를 배우는 길'],['nature','환경·생명 분야를 배우는 길'],['art','문화 연구·창작으로 전환']],art:[['art','창작·디자인을 이어 가는 길'],['tech','디지털 콘텐츠 기술로 넓히기'],['people','문화예술 교육을 준비하기'],['science','문화 자료 연구로 전환'],['nature','지역 생태·문화 기획으로 연결']],sport:[['people','스포츠 지도·교육을 준비하기'],['science','운동·건강 연구를 배우기'],['tech','스포츠 기술·장비 분야 탐색'],['art','스포츠 콘텐츠 제작으로 연결'],['nature','야외활동·환경 교육을 준비하기']],tech:[['tech','전문 기술을 익혀 현장으로'],['science','기술 연구·분석으로 심화'],['people','기술을 가르치는 분야 준비'],['nature','환경·농업 기술로 연결'],['art','설계·디자인 분야로 전환']],community:[['people','교육·돌봄·지역사회 분야 준비'],['nature','지역 환경·생태 분야 준비'],['art','지역 문화 기획으로 연결'],['tech','지역 문제를 푸는 기술 배우기'],['science','정책·지역 자료 연구 준비']],explore:Object.entries({science:'연구·분석',tech:'기술·제작',art:'문화·예술',nature:'환경·생명',people:'교육·지역사회'}).map(([k,v])=>[k,v+'부터 새롭게 배우기'])};return sc('first-career-'+u.goal,'스무 살, 지금의 첫 진로를 정하기',`${GOALS[u.goal]}에서 출발해 ${u.adjustment==='restart'?'방향을 바꾸는':'이어 가는'} 첫 계획입니다. 아래 직업은 배움의 목표이며 자격·취업을 자동으로 얻지 않습니다.`,table[u.goal].map(([k,title])=>o('career7-'+k,title,`${s.route==='work'?'일과 후학습':s.route==='study'?'전공 공부':s.route==='local'?'지역의 배움':'새 경험'}로 준비합니다. 이후에도 바꿀 수 있어요.`,`‘${title}’라는 첫 방향을 정했어요. 필요한 교육과 경험을 쌓고 다시 선택할 여지를 남겼어요.`,{career:k,careerTitle:title},{agency:3,rest:2})))}
return null;}
const api={decision,policies,GOALS,chooseSchools};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LeapCareerV7=api;
})(typeof window!=='undefined'?window:globalThis);
