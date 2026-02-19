/* ============================
   Minimal backend for Gemini proxy + static hosting
   ============================ */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { URL } = require('node:url');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const raw = fs.readFileSync(filePath, 'utf-8');
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const separator = trimmed.indexOf('=');
    if (separator === -1) return;

    const key = trimmed.slice(0, separator).trim();
    if (!key || process.env[key] !== undefined) return;

    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  });
}

loadEnvFile(path.join(__dirname, '.env'));

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const GEMINI_API_KEY = String(process.env.GEMINI_API_KEY || '').trim();
const GEMINI_MODEL = String(process.env.GEMINI_MODEL || 'gemini-2.5-flash').trim();
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const MAX_HISTORY_MESSAGES = 20;

const SYSTEM_PROMPT = `あなたは山本直哉のAGIアシスタントです。
以下のルールで回答してください。

- 回答は短く、実行しやすい形にする
- AGI、AIエージェント、自動化、実装の話題を優先する
- 不明な点は推測せず、確認質問を1つだけ返す
- 日本語の質問には日本語、英語の質問には英語で返す
- 最後に必要なら1行だけ次アクションを提案する

プロフィール:
- 名前: 山本直哉
- テーマ: AGI / AI実装
- 連絡先: naoya.ado1dem@gmail.com
`;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(content);
  });
}

function normalizePublicPath(requestPath) {
  const decoded = decodeURIComponent(requestPath);
  const normalized = path.normalize(decoded).replace(/^\/+/, '');
  if (normalized.includes('..')) return null;
  if (!normalized || normalized === '.') return 'index.html';
  return normalized;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function toGeminiHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => {
      const role = item && item.role === 'model' ? 'model' : 'user';
      const text = String(item && item.text ? item.text : '').trim();
      if (!text) return null;
      return {
        role,
        parts: [{ text }]
      };
    })
    .filter(Boolean);
}

async function handleChatApi(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method Not Allowed' });
    return;
  }

  if (!GEMINI_API_KEY) {
    sendJson(res, 500, { error: 'Server GEMINI_API_KEY is not set.' });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(req);
  } catch (error) {
    sendJson(res, 400, { error: error.message || 'Bad Request' });
    return;
  }

  const message = String(payload && payload.message ? payload.message : '').trim();
  if (!message) {
    sendJson(res, 400, { error: 'message is required.' });
    return;
  }

  const history = toGeminiHistory(payload && payload.history);
  const contents = [
    ...history,
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  const geminiPayload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 360
    }
  };

  let geminiResponse;
  try {
    geminiResponse = await fetch(`${GEMINI_ENDPOINT}?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload)
    });
  } catch (error) {
    sendJson(res, 502, { error: `Upstream request failed: ${error.message}` });
    return;
  }

  let geminiData = {};
  try {
    geminiData = await geminiResponse.json();
  } catch (_) {
    geminiData = {};
  }

  if (!geminiResponse.ok) {
    const errorMessage = geminiData?.error?.message || `Gemini HTTP ${geminiResponse.status}`;
    sendJson(res, geminiResponse.status, { error: errorMessage });
    return;
  }

  const parts = geminiData?.candidates?.[0]?.content?.parts || [];
  const text = parts.map((part) => part.text || '').join('').trim();

  if (!text) {
    sendJson(res, 502, { error: 'Gemini returned empty text.' });
    return;
  }

  sendJson(res, 200, { text });
}

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (reqUrl.pathname === '/api/chat') {
    await handleChatApi(req, res);
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  const publicPath = normalizePublicPath(reqUrl.pathname);
  if (!publicPath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad Request');
    return;
  }

  const target = path.join(ROOT, publicPath);
  const safeTarget = path.resolve(target);

  if (!safeTarget.startsWith(path.resolve(ROOT))) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  const exists = fs.existsSync(safeTarget);
  if (!exists) {
    sendFile(res, path.join(ROOT, 'index.html'));
    return;
  }

  sendFile(res, safeTarget);
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
