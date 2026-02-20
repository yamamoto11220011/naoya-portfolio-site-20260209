import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const SYSTEM_PROMPT = `あなたは山本直哉（Naoya Yamamoto）の公式AIアシスタントです。
サイトを訪問した方からの質問に、山本直哉の情報に基づいて丁寧かつ簡潔に回答してください。
以下が山本直哉のプロフィール情報です。この情報に基づいて回答してください。
情報にないことは「その点については詳しい情報がありませんが、直接お問い合わせいただければお答えできます」と案内してください。

---

【基本情報】
名前：山本 直哉（Naoya Yamamoto）
所属：ZEN大学
肩書き：Google AI 学生 ambassador / NewsPicks アンバサダー / 積水グループアンバサダー
メール：naoya.ado1dem@gmail.com

【ビジョン・キャッチコピー】
「AGIの未来を本気で叶える。」
思考はAGIではなくASI志向。人類の知能拡張を実装で前に進める。

【About - 自己紹介】
山本直哉はAIが大好きすぎるZEN大学生。
AGI/ASIの実装を本気で進めるために、AIツールと自動化に没頭している。
将来はAGI houseなど、最前線コミュニティにも積極的に参加して学びたい。

【強み（3つ）】
1. 情報収集→要点抽出→意思決定の整理（リサーチ・分析）
2. 自動化ツールの試作（ワークフロー/AI秘書系）（自動化・プロトタイピング）
3. Webサイト制作（実装→改善まで）（Web制作・改善）

【実績・プロジェクト】
■ Google AI 学生 ambassador
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
- AGI/ASIに向けた知能拡張の実装
- AI秘書・自動化ツールの開発
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

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not set' });
    }

    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    const safeHistory = Array.isArray(history) ? history : [];
    const trimmedHistory = safeHistory.slice(-20);
    const contents = [
      ...trimmedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const payload = {
      systemInstruction: {
        role: 'system',
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 400
      }
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(502).json({ error: `Gemini API Error: ${response.status} ${errText}` });
    }

    const data = await response.json();
    const aiText =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
      '申し訳ございません。回答を生成できませんでした。';

    return res.json({ text: aiText });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
