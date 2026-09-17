const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
function load(fetch) {
  const m = { exports: {} };
  const js = ts.transpileModule(fs.readFileSync('src/lib/registration-security.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(js, { exports: m.exports, require, process: { env: { REGISTRATION_SECRET: 'test-secret', REGISTRATION_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec' } }, Buffer, Date, URL, AbortSignal, console: { info() {}, warn() {} }, fetch });
  return m.exports;
}
const redirect = () => new Response(null, { status: 302, headers: { location: 'https://script.googleusercontent.com/macros/echo?test=confirmation' } });
test('retries failed confirmation GET without resubmitting registration or secret', async () => {
  const calls = [];
  const s = load(async (url, options) => {
    calls.push({ url, options });
    if (calls.length === 1) return redirect();
    if (calls.length === 2) throw new Error('connection lost');
    return Response.json({ ok: true });
  });
  assert.equal((await s.scriptRequest({ name: 'Test' })).ok, true);
  assert.deepEqual(calls.map(c => c.options.method), ['POST', 'GET', 'GET']);
  for (const c of calls.slice(1)) { assert.equal(c.options.body, undefined); assert.equal(c.options.headers, undefined); assert.ok(!c.url.includes('test-secret')); }
});
test('rejects unexpected redirect hosts without contacting them', async () => {
  let calls = 0;
  const s = load(async () => { calls++; return new Response(null, { status: 302, headers: { location: 'https://attacker.example/' } }); });
  await assert.rejects(s.scriptRequest({}), /unexpected_redirect/);
  assert.equal(calls, 1);
});
test('confirmation failure has bounded retries and never reports success', async () => {
  let calls = 0;
  const s = load(async () => ++calls === 1 ? redirect() : new Response(null, { status: 503 }));
  await assert.rejects(s.scriptRequest({}), /confirmation_unavailable/);
  assert.equal(calls, 4);
});
test('preserves rejection from the script', async () => {
  const s = load(async () => Response.json({ ok: false }));
  assert.equal((await s.scriptRequest({})).ok, false);
});
