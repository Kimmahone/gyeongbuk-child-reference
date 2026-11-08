import {schoolProfile} from '../../server/school-profile.mjs';
export function onRequest(context){return schoolProfile(context.request,{cache:caches.default,waitUntil:p=>context.waitUntil(p)});}
