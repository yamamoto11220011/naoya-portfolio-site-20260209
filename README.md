# 山本 直哉 - ポートフォリオサイト

## プロジェクト概要
山本直哉（Naoya Yamamoto）の1ページ完結型ポートフォリオサイト。
宇宙テーマの全画面星空背景 + 「AI IS GOD」スプラッシュスクリーン + Gemini 1.5 Flash AIチャット搭載。

## 実装済み機能

### 構成セクション
- **Splash**：「AI IS GOD」フルスクリーン演出（Orbitronフォント、グラデーションテキスト、アニメーション入場）
- **ヘッダー**：固定ナビ（glassmorphism） + 「相談する」CTAボタン
- **Hero**：プロフィール写真（角丸） + 名前・肩書き・キャッチコピー・CTA
- **AI Chat**：Gemini 1.5 Flash 搭載のAIチャット（山本直哉の学習データで回答）
- **About**：自己紹介 + 強み3つ（アイコン+タグ）
- **Works / Projects**：実績カード2枚
- **Now**：現在注力中の項目
- **Links**：GitHub・Email
- **Contact**：依頼テンプレート（コピー機能）+ メール送信
- **フッター**：メッセージ + ©

### 宇宙テーマ演出
- **Canvas星空**: 320個の星がゆらめき＋流れ星が定期出現
- **星雲（Nebula）**: 超薄い放射グラデーションで深宇宙感
- **全セクション背景が透過**: 星空が全ページに渡って見える
- **カード・チャットにbackdrop-filter**: glassmorphism表現

### フォント
- **Orbitron**: 「AI IS GOD」スプラッシュ専用（SF/テック系）
- **Space Grotesk**: ヘッダー・ナビ・セクションタイトル・タグ（モダンテック系）
- **Noto Sans JP**: 日本語本文

### AIチャット機能
- **モデル**: Gemini 1.5 Flash（無料枠）
- **学習データ**: 山本直哉の全プロフィール情報をシステムプロンプトに埋め込み
- **機能**: サジェスチョンチップ、会話履歴保持、Markdownレンダリング、タイピングインジケーター

## ファイル構成
```
index.html              メインページ
css/style.css           スタイルシート（宇宙テーマ）
js/main.js              メインJavaScript
js/stars.js             星空Canvasアニメーション
js/chat.js              Gemini AIチャット機能
images/naoya_avatar.jpg プロフィール写真
images/hero-bg.jpg      (未使用・予備)
```

## エントリURI
- `/index.html` — メインページ
- ページ内リンク: `#splash`, `#hero`, `#ai-chat`, `#about`, `#works`, `#now`, `#links`, `#contact`

## 使用技術・CDN
- Google Fonts（Orbitron / Space Grotesk / Noto Sans JP）
- Font Awesome 6.4.0
- Marked.js（Markdownレンダリング）
- Gemini 1.5 Flash API
- Canvas API（星空アニメーション）
- Vanilla JavaScript

## カスタマイズ箇所
- **Gemini APIキー**: `js/chat.js` の `GEMINI_API_KEY`
- **GitHub URL**: Links セクション内
- **メールアドレス**: `naoya.ado1dem@gmail.com`
- **プロフィール写真**: `images/naoya_avatar.jpg`
