(function(root){'use strict';const data=typeof module!=='undefined'&&module.exports?require('./early-data.js'):root.LeapEarlyData;
const get=id=>data.institutions.find(x=>x.id===id),available=(region,kind,year)=>data.institutions.filter(x=>x.regionId===region&&x.kind===kind&&x.eligible&&/^\d{4}/.test(x.founded)&&+x.founded.slice(0,4)<=year).sort((a,b)=>a.name.localeCompare(b.name,'ko'));
const description=id=>{const x=get(id);return x?`${x.term} · 원아 ${x.students==null?'미확인':x.students+'명'}${x.classes!=null?' · '+x.classes+'학급':''}`:''};
const api={data,get,available,description};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LeapEarly=api;
})(typeof window!=='undefined'?window:globalThis);
