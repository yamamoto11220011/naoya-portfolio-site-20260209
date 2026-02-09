/* ============================
   Gemini 2.5 Flash Chat - Naoya AI Assistant
   ============================ */

const LANG_STORAGE_KEY = 'portfolio_lang';

const QA_KNOWLEDGE = [
  {
    key: 'profile',
    question: '山本直哉とは？',
    keywords: ['山本直哉', '東京', '香川西高校', '特待生', '野球部']
  },
  {
    key: 'youtuber',
    question: '好きなyoutuberは？',
    keywords: ['youtuber', 'ユーチューバー', 'youtube', 'コスメティック田中']
  },
  {
    key: 'relation',
    question: '西村博之とはどんな関係ですか？',
    keywords: ['西村博之', 'ひろゆき', '関係', 'zen大学', '同級生']
  },
  {
    key: 'agi',
    question: 'AGIは来ますか？',
    keywords: ['agi', '来ますか', '人工汎用知能']
  }
];

const QA_ANSWERS = {
  ja: {
    profile: '山本直哉は、東京生まれで中学まで東京で過ごし、高校から香川西高校の特待生として野球部に所属していました。',
    youtuber: '好きなYouTuberは、コスメティック田中です。',
    relation: '西村博之さんとは、ZEN大学1期生としての同級生という関係です。',
    agi: 'AGIについては「もう来てます」という認識です。',
    fallback: 'その質問はデータにないため答えられません。候補から選んでください。'
  },
  en: {
    profile: 'Naoya Yamamoto was born in Tokyo, lived there through middle school, then joined Kagawa Nishi High School baseball team as a scholarship student.',
    youtuber: 'Favorite YouTuber: Cosmetic Tanaka.',
    relation: 'He and Hiroyuki Nishimura are classmates as first-year students at ZEN University.',
    agi: 'About AGI: "It is already here."',
    fallback: 'That question is outside this dataset. Please choose from the provided options.'
  },
  id: {
    profile: 'Naoya Yamamoto lahir di Tokyo, tinggal di Tokyo hingga SMP, lalu masuk tim baseball SMA Kagawa Nishi sebagai siswa beasiswa.',
    youtuber: 'YouTuber favorit: Cosmetic Tanaka.',
    relation: 'Dengan Hiroyuki Nishimura, hubungannya adalah teman seangkatan sebagai mahasiswa angkatan pertama ZEN University.',
    agi: 'Tentang AGI: "Sudah datang."',
    fallback: 'Pertanyaan itu tidak ada di dataset ini. Silakan pilih dari opsi yang tersedia.'
  },
  zh: {
    profile: '山本直哉出生于东京，中学前一直在东京生活，高中以特待生身份加入香川西高中棒球部。',
    youtuber: '喜欢的 YouTuber 是 Cosmetic Tanaka。',
    relation: '与西村博之的关系：作为 ZEN 大学第一期学生的同学。',
    agi: '关于 AGI：“已经来了。”',
    fallback: '这个问题不在数据范围内，请从候选项中选择。'
  },
  ko: {
    profile: '야마모토 나오야는 도쿄 출생이며 중학교까지 도쿄에서 지냈고, 고등학교부터 가가와니시고 야구부 특기생으로 활동했습니다.',
    youtuber: '좋아하는 유튜버는 코스메틱 타나카입니다.',
    relation: '니시무라 히로유키와의 관계는 ZEN대학 1기 동기입니다.',
    agi: 'AGI에 대해서는 "이미 왔다"는 인식입니다.',
    fallback: '해당 질문은 데이터 범위를 벗어납니다. 제공된 선택지에서 골라주세요.'
  }
};

const EMBEDDING_MIN_SCORE = 0.22;

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
const chatSuggestions = document.getElementById('chatSuggestions');

// ── サジェスチョンチップクリック ──
if (chatSuggestions) {
  chatSuggestions.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      const selectedKey = chip.getAttribute('data-key') || '';
      if (query) {
        handleSend(chip.textContent.trim(), selectedKey, query);
      }
    });
  });
}

// ── 送信処理 ──
async function handleSend(selectedMessage, selectedKey = '', lookupText = '') {
  const message = String(selectedMessage || '').trim();
  if (!message) return;

  // ユーザーメッセージ追加
  appendMessage(message, 'user');

  // タイピングインジケーター表示
  const typingEl = appendTyping();

  try {
    const response = await callEmbeddingAssistant(lookupText || message, selectedKey);
    typingEl.remove();
    appendMessage(response, 'ai');
  } catch (error) {
    typingEl.remove();
    console.error('Embedding Search Error:', error);
    appendMessage('申し訳ございません。回答エラーが発生しました。\n\n(詳細: ' + error.message + ')', 'ai');
  }
}

// ── 埋め込み（簡易ベクトル）ベース回答 ──
async function callEmbeddingAssistant(userMessage, selectedKey = '') {
  // 履歴に追加
  chatHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });
  const lang = localStorage.getItem(LANG_STORAGE_KEY) || 'ja';
  const dict = QA_ANSWERS[lang] || QA_ANSWERS.ja;
  let hitKey = selectedKey;
  if (!hitKey) {
    const best = findBestKnowledge(userMessage);
    if (best && best.score >= EMBEDDING_MIN_SCORE) hitKey = best.entry.key;
  }
  const aiText = (hitKey && dict[hitKey]) ? dict[hitKey] : dict.fallback;

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

function findBestKnowledge(query) {
  const queryNorm = normalizeText(query);
  const queryVec = toVector(queryNorm);
  let best = null;

  for (const entry of QA_KNOWLEDGE) {
    const qNorm = normalizeText(entry.question);
    const entryVec = toVector(qNorm);
    let score = cosineSimilarity(queryVec, entryVec);

    if (queryNorm.includes(qNorm) || qNorm.includes(queryNorm)) {
      score += 0.35;
    }

    const keywordHits = entry.keywords.filter((k) => queryNorm.includes(normalizeText(k))).length;
    score += Math.min(0.3, keywordHits * 0.1);

    if (!best || score > best.score) {
      best = { entry, score };
    }
  }

  return best;
}

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[\s　]+/g, '')
    .replace(/[?？!！。、「」『』（）()]/g, '');
}

function toVector(text) {
  const vector = new Map();
  const n = 2;
  if (!text) return vector;
  if (text.length <= n) {
    vector.set(text, 1);
    return vector;
  }
  for (let i = 0; i <= text.length - n; i += 1) {
    const token = text.slice(i, i + n);
    vector.set(token, (vector.get(token) || 0) + 1);
  }
  return vector;
}

function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const val of a.values()) {
    normA += val * val;
  }
  for (const val of b.values()) {
    normB += val * val;
  }
  for (const [token, valA] of a.entries()) {
    if (b.has(token)) {
      dot += valA * b.get(token);
    }
  }

  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
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
