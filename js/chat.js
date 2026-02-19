/* ============================
   Gemini AGI Chat
   ============================ */

const CHAT_API_ENDPOINT = '/api/chat';
const MAX_HISTORY_MESSAGES = 20;

let chatHistory = [];
let isSending = false;

const chatMessages = document.getElementById('chatMessages');
const chatSuggestions = document.getElementById('chatSuggestions');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

if (chatSuggestions) {
  chatSuggestions.querySelectorAll('.suggestion-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      if (isSending) return;
      const query = chip.getAttribute('data-query') || chip.textContent.trim();
      if (!query) return;
      handleSend(query);
    });
  });
}

if (chatForm) {
  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!chatInput || isSending) return;

    const message = chatInput.value.trim();
    if (!message) return;

    chatInput.value = '';
    handleSend(message);
  });
}

async function handleSend(message) {
  const text = String(message || '').trim();
  if (!text || !chatMessages) return;

  appendMessage(text, 'user');
  const typing = appendTyping();
  setSendingState(true);

  try {
    const response = await callGemini(text);
    typing.remove();
    appendMessage(response, 'ai');
  } catch (error) {
    typing.remove();
    appendMessage(
      [
        'サーバー経由のGemini呼び出しに失敗しました。',
        '',
        `詳細: ${error.message}`
      ].join('\n'),
      'ai'
    );
  } finally {
    setSendingState(false);
  }
}

function setSendingState(sending) {
  isSending = sending;
  if (chatInput) chatInput.disabled = sending;
  if (chatSend) chatSend.disabled = sending;
  if (chatSuggestions) {
    chatSuggestions.querySelectorAll('.suggestion-chip').forEach((chip) => {
      chip.disabled = sending;
    });
  }
}

async function callGemini(userMessage) {
  const payload = {
    message: userMessage,
    history: chatHistory.slice(-MAX_HISTORY_MESSAGES)
  };

  const response = await fetch(CHAT_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let data = {};
  try {
    data = await response.json();
  } catch (_) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data?.error || data?.message || `HTTP ${response.status}`);
  }

  const text = String(data?.text || '').trim();

  if (!text) {
    throw new Error('Geminiから回答テキストを取得できませんでした。');
  }

  chatHistory.push({ role: 'user', text: userMessage });
  chatHistory.push({ role: 'model', text });
  if (chatHistory.length > MAX_HISTORY_MESSAGES * 2) {
    chatHistory = chatHistory.slice(-(MAX_HISTORY_MESSAGES * 2));
  }

  return text;
}

function appendMessage(text, sender) {
  if (!chatMessages) return;

  const msg = document.createElement('div');
  msg.className = `chat-entry ${sender === 'user' ? 'user-message' : 'ai-message'}`;

  const contentHtml = sender === 'user' ? escapeHTML(text) : renderMarkdown(text);

  msg.innerHTML = `
    <div class="chat-entry-text">${contentHtml}</div>
  `;

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendTyping() {
  if (!chatMessages) return { remove: () => {} };

  const msg = document.createElement('div');
  msg.className = 'chat-entry ai-message typing';
  msg.innerHTML = `
    <div class="chat-entry-text">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>
  `;

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

function renderMarkdown(text) {
  if (typeof marked !== 'undefined' && marked.parse) {
    try {
      return marked.parse(text);
    } catch (_) {
      return simpleMarkdown(text);
    }
  }
  return simpleMarkdown(text);
}

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

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
