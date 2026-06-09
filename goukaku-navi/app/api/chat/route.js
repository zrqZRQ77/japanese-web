export async function POST(req) {
  const { question, options, correctAnswer, explanation } = await req.json()

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return Response.json({
      answer: '【APIキー未設定】\n\nVercelの環境変数にANTHROPIC_API_KEYを設定してください。\n\n設定方法：Vercel Dashboard → Settings → Environment Variables → ANTHROPIC_API_KEY を追加'
    })
  }

  const prompt = `あなたはFP・証券・資格試験の専門家です。以下の試験問題について、受験生が深く理解できるよう丁寧に解説してください。

【問題】
${question}

【選択肢】
${options.map((o, i) => `${i + 1}. ${o}`).join('\n')}

【正解】
${correctAnswer}

【基本解説】
${explanation}

上記の基本解説を踏まえて、以下の点を補足説明してください：
1. なぜ他の選択肢が間違いなのか
2. 試験で狙われやすいポイント
3. 関連する重要概念があれば簡単に

200〜300字程度で、受験生に寄り添った分かりやすい日本語でお願いします。`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    const answer = data.content?.[0]?.text || 'AI解説の取得に失敗しました。'
    return Response.json({ answer })
  } catch (e) {
    return Response.json({ answer: 'エラーが発生しました：' + e.message })
  }
}
