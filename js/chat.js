/* ============================
   Gemini 2.5 Flash Chat - Naoya AI Assistant
   ============================ */

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_KEY_STORAGE_KEY = 'GEMINI_API_KEY';

function getGeminiApiKey() {
  return (window.localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || '').trim();
}

function setGeminiApiKey(key) {
  window.localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, key.trim());
}

function clearGeminiApiKey() {
  window.localStorage.removeItem(GEMINI_API_KEY_STORAGE_KEY);
}

function getGeminiApiUrl(apiKey) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
}

function ensureGeminiApiKey() {
  let apiKey = getGeminiApiKey();
  if (apiKey) return apiKey;

  const input = window.prompt('Gemini APIキーを入力してください（ブラウザ内保存）');
  if (!input) {
    throw new Error('APIキー未設定');
  }
  apiKey = input.trim();
  if (!apiKey) {
    throw new Error('APIキー未設定');
  }
  setGeminiApiKey(apiKey);
  return apiKey;
}

// ── 山本直哉の学習データ（システムプロンプト） ──
const SYSTEM_PROMPT = `あなたは山本直哉（Naoya Yamamoto）の公式AIアシスタントです。
サイトを訪問した方からの質問に、山本直哉の情報に基づいて丁寧かつ簡潔に回答してください。
以下が山本直哉のプロフィール情報です。この情報に基づいて回答してください。
情報にないことは「その点については詳しい情報がありませんが、直接お問い合わせいただければお答えできます」と案内してください。

---

【基本情報】
名前：山本 直哉（Naoya Yamamoto）
所属：ZEN大学
肩書き：Google 学生AIアンバサダー / NewsPicks アンバサダー / 積水グループアンバサダー
メール：naoya.ado1dem@gmail.com

【ビジョン・キャッチコピー】
「AIと自動化で、やりたいことを最短で形にする。」
企画→実装→改善までを短いサイクルで回す。

【About - 自己紹介】
AIが好きという原動力を活かし、日々の学習と制作を加速させている。
強みは、情報収集から整理、そして実装までのサイクルを短期間で回せること。
現在はAI秘書のようなエージェント機能を持つ自動化ツールや、誰でも更新可能なWebサイトの仕組みづくりに注力。
長期的には、汎用人工知能に近づく技術やプロダクトの実装に携わり続けることを目標としている。
AIネイティブ世代で、とにかくAIツールを触るのが好き。

【強み（3つ）】
1. 情報収集→要点抽出→意思決定の整理（リサーチ・分析）
2. 自動化ツールの試作（ワークフロー/AI秘書系）（自動化・プロトタイピング）
3. Webサイト制作（実装→改善まで）（Web制作・改善）

【実績・プロジェクト】
■ Google 学生AIアンバサダー
- 役割：学生アンバサダー
- 規模：70名規模
- やったこと：イベント運営、参加者サポート、企画推進
- 成果：優秀評価を獲得

■ AIサークル長（270名）
- 役割：代表／運営体制づくり
- 規模：270名のサークル
- やったこと：イベント企画運営、メンバー支援、運営フロー整備
- 成果：30人規模のオフライン・オンラインイベントを開催

【いま注力していること（Now）】
- AI秘書・自動化ツールの開発
- 誰でも作れて更新できるサイト制作の仕組み化
- AI活用で学習と制作の速度を上げる

【依頼について】
相談内容が固まっていなくてもOK。目的だけ教えてもらえれば対応可能。
連絡先：naoya.ado1dem@gmail.com

【回答スタイルのルール】
- 必ず日本語で回答する
- 簡潔で読みやすく、箇条書きを活用する
- フレンドリーだが丁寧な口調
- 山本直哉を「直哉」ではなく「山本」もしくは「山本直哉」と呼ぶ
- 質問が山本直哉に関係ない場合は、やんわりと「山本直哉についてのご質問にお答えしています」と案内する
- 最大200文字程度で端的に回答する（長くなりすぎない）
`;

// ── チャット履歴 ──
let chatHistory = [];

// ── DOM要素 ──
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatSuggestions = document.getElementById('chatSuggestions');

// ── サジェスチョンチップクリック ──
if (chatSuggestions) {
  chatSuggestions.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        chatInput.value = query;
        handleSend();
      }
    });
  });
}

// ── フォーム送信 ──
if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSend();
  });
}

// ── 送信処理 ──
async function handleSend() {
  const message = chatInput.value.trim();
  if (!message) return;

  // サジェスチョンを非表示
  if (chatSuggestions) {
    chatSuggestions.style.display = 'none';
  }

  // ユーザーメッセージ追加
  appendMessage(message, 'user');
  chatInput.value = '';
  chatSend.disabled = true;

  // タイピングインジケーター表示
  const typingEl = appendTyping();

  try {
    const response = await callGemini(message);
    typingEl.remove();
    appendMessage(response, 'ai');
  } catch (error) {
    typingEl.remove();
    console.error('Gemini API Error:', error);
    appendMessage('申し訳ございません。接続エラーが発生しました。しばらくしてからもう一度お試しください。\n\n(詳細: ' + error.message + ')', 'ai');
  }

  chatSend.disabled = false;
  chatInput.focus();
}

// ── Gemini API呼び出し ──
async function callGemini(userMessage) {
  const apiKey = ensureGeminiApiKey();
  const apiUrl = getGeminiApiUrl(apiKey);

  // 履歴に追加
  chatHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  // リクエストボディ構築（system_instruction を使用）
  const requestBody = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: chatHistory,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 512,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
    ]
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    // 履歴からエラーになったメッセージを削除
    chatHistory.pop();

    if (response.status === 403 && errorText.includes('reported as leaked')) {
      clearGeminiApiKey();
      throw new Error('APIキーが無効化されています。新しいキーを入力して再試行してください。');
    }

    throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();

  // レスポンス取得
  const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) {
    // ブロックされた場合などの処理
    const blockReason = data.candidates?.[0]?.finishReason;
    const promptFeedback = data.promptFeedback?.blockReason;
    chatHistory.pop();
    
    if (blockReason === 'SAFETY' || promptFeedback) {
      return 'すみません、その質問には回答できませんでした。別の質問をお試しください。';
    }
    return 'すみません、回答を生成できませんでした。もう一度お試しください。';
  }

  // 履歴に追加
  chatHistory.push({
    role: 'model',
    parts: [{ text: aiText }]
  });

  // 履歴が長くなりすぎないよう制限（直近10往復 = 20メッセージ）
  if (chatHistory.length > 20) {
    chatHistory = chatHistory.slice(-20);
  }

  return aiText;
}

// ── メッセージ追加 ──
function appendMessage(text, sender) {
  const msgEl = document.createElement('div');
  msgEl.className = `chat-message ${sender === 'user' ? 'user-message' : 'ai-message'}`;

  if (sender === 'user') {
    msgEl.innerHTML = `
      <div class="chat-avatar-user">
        <i class="fas fa-user"></i>
      </div>
      <div class="chat-bubble">${escapeHTML(text)}</div>
    `;
  } else {
    const htmlContent = renderMarkdown(text);
    msgEl.innerHTML = `
      <div class="chat-avatar-ai">
        <i class="fas fa-robot"></i>
      </div>
      <div class="chat-bubble">${htmlContent}</div>
    `;
  }

  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ── タイピングインジケーター追加 ──
function appendTyping() {
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-message ai-message typing';

  msgEl.innerHTML = `
    <div class="chat-avatar-ai">
      <i class="fas fa-robot"></i>
    </div>
    <div class="chat-bubble">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;

  chatMessages.appendChild(msgEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msgEl;
}

// ── Markdownレンダリング ──
function renderMarkdown(text) {
  if (typeof marked !== 'undefined' && marked.parse) {
    try {
      return marked.parse(text);
    } catch (e) {
      return simpleMarkdown(text);
    }
  }
  return simpleMarkdown(text);
}

// ── 簡易Markdownフォールバック ──
function simpleMarkdown(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
}

// ── HTMLエスケープ ──
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
