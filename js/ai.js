/* Adorn — Claude bağlantısı (isteğe bağlı). Sıra: kullanıcı API anahtarı → barındırıcı "sample" yeteneği → yok (yerel motor). */
(function () {
  const MODEL = 'claude-sonnet-5-5';
  const API = 'https://api.anthropic.com/v1/messages';
  let sample = null; let sampleDenied = false;

  // Claude Artifact önizlemesinde çalışıyorsa yerleşik Claude erişimini kullan
  try {
    if (window.claude && typeof window.claude.use === 'function') {
      window.claude.use('sample').then(s => { sample = s || null; window.dispatchEvent(new Event('adorn:ai')); }, () => {});
    }
  } catch (_) {}

  const key = () => (window.ADORN_KEY || '').trim();

  function source() {
    if (!navigator.onLine) return null;
    if (key()) return 'api';
    if (sample && !sampleDenied) return 'sample';
    return null;
  }

  async function blobToB64(blob) {
    const buf = new Uint8Array(await blob.arrayBuffer());
    let s = '';
    for (let i = 0; i < buf.length; i += 32768) s += String.fromCharCode.apply(null, buf.subarray(i, i + 32768));
    return btoa(s);
  }

  async function apiStream({ system, messages, image, maxTokens = 800, onText, signal, stream = true }) {
    const msgs = messages.map(m => ({ role: m.role, content: m.content }));
    if (image) {
      const last = msgs[msgs.length - 1];
      last.content = [
        { type: 'image', source: { type: 'base64', media_type: image.type || 'image/jpeg', data: await blobToB64(image) } },
        { type: 'text', text: last.content }
      ];
    }
    const res = await fetch(API, {
      method: 'POST', signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': key(),
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: msgs, stream })
    });
    if (!res.ok) {
      let msg = 'HTTP ' + res.status;
      try { const j = await res.json(); msg = j.error?.message || msg; } catch (_) {}
      throw { code: res.status === 401 ? 'bad_key' : 'http', message: msg };
    }
    if (!stream) { const j = await res.json(); return (j.content || []).map(b => b.text || '').join(''); }
    const reader = res.body.getReader(); const dec = new TextDecoder();
    let buf = '', text = '';
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line.startsWith('data:')) continue;
        try {
          const ev = JSON.parse(line.slice(5));
          if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') { text += ev.delta.text; onText && onText(text); }
          if (ev.type === 'error') throw { code: 'stream', message: ev.error?.message };
        } catch (e) { if (e && e.code) throw e; }
      }
    }
    return text;
  }

  async function sampleCall({ system, messages, image, onText, signal }) {
    const input = messages.map((m, i) => ({ role: m.role, content: i === 0 && m.role === 'user' ? system + '\n\n---\n\n' + m.content : m.content }));
    if (input[0]?.role !== 'user') input.unshift({ role: 'user', content: system });
    const opts = { cache: false, modelTier: 'default', signal, onText: onText ? ({ text }) => onText(text) : undefined };
    if (image) opts.images = [image];
    try {
      const r = await sample(input, opts);
      return r.text;
    } catch (e) {
      if (e && e.code === 'not_granted') sampleDenied = true;
      throw e;
    }
  }

  async function chat(opts) {
    const src = source();
    if (src === 'api') return apiStream(opts);
    if (src === 'sample') return sampleCall(opts);
    throw { code: 'unavailable' };
  }

  async function json(opts) {
    const text = await chat({ ...opts, onText: null, stream: false });
    const m = String(text).match(/\{[\s\S]*\}/);
    if (!m) throw { code: 'parse' };
    return JSON.parse(m[0]);
  }

  window.ADORN_AI = { source, chat, json, MODEL };
})();
