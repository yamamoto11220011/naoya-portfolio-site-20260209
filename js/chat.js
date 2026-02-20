/* ============================
   Gemini Chat - Naoya AI Assistant
   ============================ */

// ── チャット履歴 ──
let chatHistory = [];

// ── DOM要素 ──
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatForm = document.getElementById('chatForm');

let lastSendAt = 0;

function triggerSend() {
  const now = Date.now();
  if (now - lastSendAt < 200) return;
  lastSendAt = now;
  handleSend(chatInput.value);
  chatInput.value = '';
}

if (chatForm && chatInput) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    triggerSend();
  });

  chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      triggerSend();
    }
  });

  chatInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      triggerSend();
    }
  });
}

// ── 送信処理 ──
async function handleSend(selectedMessage) {
  const message = String(selectedMessage || '').trim();
  if (!message) return;

  // ユーザーメッセージ追加
  appendMessage(message, 'user');

  // タイピングインジケーター表示
  const typingEl = appendTyping();

  try {
    const response = await callGeminiAssistant(message);
    typingEl.remove();
    appendMessage(response, 'ai');

    // 履歴に追加
    chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });
    chatHistory.push({
      role: 'model',
      parts: [{ text: response }]
    });

    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }
  } catch (error) {
    typingEl.remove();
    console.error('Gemini Error:', error);
    appendMessage('申し訳ございません。回答エラーが発生しました。\n\n(詳細: ' + error.message + ')', 'ai');
  }
}

// ── API呼び出し ──
async function callGeminiAssistant(message) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history: chatHistory })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const data = await response.json();
  return data?.text || '申し訳ございません。回答を生成できませんでした。';
}

// ── メッセージ追加 ──
function appendMessage(text, sender) {
  const msgEl = document.createElement('div');
  msgEl.className = `chat-message ${sender === 'user' ? 'user-message' : 'ai-message'}`;

  if (sender === 'user') {
    msgEl.innerHTML = `
      <div class="chat-avatar-user">
        <img src="images/naoya_avatar.jpg" alt="Naoya avatar" width="34" height="34">
      </div>
      <div class="chat-bubble">${escapeHTML(text)}</div>
    `;
  } else {
    const htmlContent = renderMarkdown(text);
    msgEl.innerHTML = `
      <div class="chat-avatar-ai">
        <img src="images/naoya_avatar.jpg" alt="Naoya avatar" width="34" height="34">
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
      <img src="images/naoya_avatar.jpg" alt="Naoya avatar" width="34" height="34">
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
