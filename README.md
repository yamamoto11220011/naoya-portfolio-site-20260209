# Naoya Yamamoto Portfolio (Press Style)

静的フロント + Node.jsバックエンドで構成した1ページサイトです。  
Gemini APIキーはフロントに置かず、`/api/chat` を経由してサーバー側で呼び出します。

## 構成
- `index.html` ページ本体
- `css/style.css` UIスタイル
- `js/main.js` ナビ状態管理
- `js/chat.js` チャットUI制御（API呼び出し先は `/api/chat`）
- `server.js` 静的配信 + GeminiプロキシAPI

## セットアップ
1. `.env.example` をコピーして `.env` を作成
2. `.env` に `GEMINI_API_KEY` を設定
3. サーバー起動

```bash
cp .env.example .env
node server.js
```

起動後: `http://localhost:3000`

## 環境変数
- `PORT` (default: `3000`)
- `GEMINI_MODEL` (default: `gemini-2.5-flash`)
- `GEMINI_API_KEY` (required)

## 注意
- APIキーは `index.html` / `js/chat.js` には含めない設計です。
- `.env` は `.gitignore` に含めているため、Gitへはpushされません。
