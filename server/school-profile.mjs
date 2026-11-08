import {schoolIds} from './school-ids.mjs';
const headers={'Content-Type':'application/json; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=3600'};
const reply=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{...headers,...(status!==200?{'Cache-Control':'no-store'}:{})}});
export async function schoolProfile(request,{fetcher=fetch,cache,waitUntil=()=>{}}={}){
 if(request.method!=='GET')return reply({error:'method_not_allowed'},405);
 const code=new URL(request.url).searchParams.get('code');
 if(!/^\d{7}$/.test(code||'')||!schoolIds.has(code))return reply({error:'unknown_school'},400);
 const cacheKey=new Request(new URL('/api/school-profile?code='+code,request.url));
 if(cache){const hit=await cache.match(cacheKey);if(hit)return hit;}
 const source=new URL('https://open.neis.go.kr/hub/schoolInfo');
 source.search=new URLSearchParams({Type:'json',ATPT_OFCDC_SC_CODE:'R10',SD_SCHUL_CODE:code,pSize:'1'}).toString();
 try{
  const r=await fetcher(source.toString(),{signal:AbortSignal.timeout(8000),redirect:'error'});
  if(!r.ok||!r.body)throw Error('upstream_http_'+r.status);
  const reader=r.body.getReader(),chunks=[];let length=0;
  for(;;){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>100000){await reader.cancel();throw Error('size')}chunks.push(value)}
  const raw=new Uint8Array(length);let offset=0;for(const v of chunks){raw.set(v,offset);offset+=v.byteLength}
  const json=JSON.parse(new TextDecoder().decode(raw)),row=json.schoolInfo?.find(x=>Array.isArray(x.row))?.row?.[0];
  if(row?.SD_SCHUL_CODE!==code||row?.ATPT_OFCDC_SC_CODE!=='R10')throw Error('mismatch');
  const str=k=>typeof row[k]==='string'?row[k].slice(0,400):'';
  const response=reply({code,name:str('SCHUL_NM'),address:str('ORG_RDNMA'),founded:str('FOND_YMD'),type:str('HS_SC_NM'),profileUpdated:str('LOAD_DTM'),checkedAt:new Date().toISOString(),source:source.toString()});
  if(cache)waitUntil(cache.put(cacheKey,response.clone()).catch(()=>{}));
  return response;
 }catch(error){const reason=/^(upstream_http_\d{3}|size|mismatch)$/.test(error.message)?error.message:'upstream_connection';console.warn(JSON.stringify({event:'school_profile_unavailable',code,reason}));return reply({error:'school_source_unavailable',reason},503)}
}
