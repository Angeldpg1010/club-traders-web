const {test} = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const mod={exports:{}};
const env={REGISTRATION_SECRET:'test-only-secret'};
const js=ts.transpileModule(fs.readFileSync('src/lib/registration-security.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
vm.runInNewContext(js,{exports:mod.exports,require,process:{env},Buffer,Date,URL,AbortSignal,console,fetch:()=>{throw Error('No network in tests')}});
const s=mod.exports;
test('signed tokens reject tampering, suffixes, wrong purpose and expiry',()=>{
 const valid=s.token('form');assert.ok(s.verify(valid,'form'));assert.equal(s.verify(valid,'event'),null);assert.equal(s.verify(valid+'x','form'),null);assert.equal(s.verify(valid+'.extra','form'),null);assert.equal(s.verify(valid,'form',2000),null);
 const old=`form:${Date.now()-7200001}:test`;assert.equal(s.verify(`${old}.${s.sign(old)}`,'form'),null);
 const future=`form:${Date.now()+10000}:test`;assert.equal(s.verify(`${future}.${s.sign(future)}`,'form'),null);
});
test('campaign allowlist rejects contact data and arbitrary fields',()=>{
 assert.equal(JSON.stringify(s.attribution({utm_source:'newsletter',utm_campaign:'example@example.com',email:'private',utm_medium:'https://bad.test'})),JSON.stringify({utm_source:'newsletter'}));
});
test('rate limiter blocks requests after configured threshold',()=>{
 assert.equal(s.limited('test',2),false);assert.equal(s.limited('test',2),false);assert.equal(s.limited('test',2),true);
});
test('origin must match endpoint',()=>{
 assert.equal(s.sameOrigin(new Request('https://example.test/api',{headers:{origin:'https://bad.test'}})),false);
 assert.equal(s.sameOrigin(new Request('https://example.test/api',{headers:{origin:'https://example.test'}})),true);
});
function loadRoute(file, upstream){
 const m={exports:{}};
 const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(source,{exports:m.exports,require:name=>name==='@/lib/registration-security'?{...s,limited:()=>false,report:()=>{},scriptRequest:upstream}:require(name),process:{env},Date,console});return m.exports;
}
const payload={name:'Test',email:'test@example.com',phone:'+12025550123',consent:true,measurement:false,attribution:{utm_source:'private'}};
const stamp=`form:${Date.now()-5000}:test`;
payload.formToken=`${stamp}.${s.sign(stamp)}`;
const request=data=>new Request('https://example.test/api/registro',{method:'POST',headers:{origin:'https://example.test','content-type':'application/json'},body:JSON.stringify(data)});
test('registration discards attribution without consent and never issues a duplicate receipt',async()=>{
 let received;
 const route=loadRoute('src/app/api/registro/route.ts',async body=>{received=body;return {ok:true,duplicate:true}});
 let response=await route.POST(request(payload));assert.equal(response.status,200);assert.equal(JSON.stringify(received.attribution),'{}');assert.equal((await response.json()).receipt,null);
 response=await route.POST(request({...payload,measurement:true}));assert.equal((await response.json()).receipt,null);
});
test('honeypot, absent consent and tampered token never call storage',async()=>{
 const route=loadRoute('src/app/api/registro/route.ts',async()=>{throw Error('must not call')});
 for(const override of [{website:'bot'},{consent:false},{formToken:'bad'},{phone:'123'}])assert.equal((await route.POST(request({...payload,...override}))).status,400);
});
test('upstream failure is not presented as registration success',async()=>{
 const route=loadRoute('src/app/api/registro/route.ts',async()=>{throw Error('failed')});assert.equal((await route.POST(request(payload))).status,503);
});
test('forged click receipt never calls storage',async()=>{
 const route=loadRoute('src/app/api/eventos/route.ts',async()=>{throw Error('must not call')});assert.equal((await route.POST(request({event:'whatsapp_click',receipt:'fake'}))).status,400);
});
