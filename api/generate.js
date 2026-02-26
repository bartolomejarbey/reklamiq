// ═══════════════════════════════════════════
// REKLAMIQ – API: Generate Content
// Vercel Serverless Function
// ═══════════════════════════════════════════
// POST /api/generate
// Body: { url: "https://example.com" }
// Returns: { brandDna: {...}, posts: [...] }

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // Step 1: Scrape the website (basic)
        const siteResponse = await fetch(url, {
            headers: { 'User-Agent': 'REKLAMIQ-Bot/1.0' }
        });
        const html = await siteResponse.text();

        // Extract text content (simple approach)
        const textContent = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 3000); // Limit for API

        // Step 2: Generate Brand DNA + Posts via Claude API
        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4000,
                messages: [{
                    role: 'user',
                    content: `Jsi expert na brand marketing a social media pro české malé firmy.

OBSAH WEBU:
${textContent}

ÚKOL: Na základě obsahu webu vytvoř:

1. BRAND DNA profil (JSON)
2. Přesně 12 příspěvků: 10 organických + 2 reklamní

Odpověz POUZE validním JSON v tomto formátu (žádný jiný text):
{
  "brandDna": {
    "name": "název firmy",
    "tags": ["obor", "tón komunikace", "cílová skupina", "lokace", "USP", "klíčová služba"],
    "tone": "přátelský/profesionální/luxusní/hravý",
    "colors": ["#hex1", "#hex2"],
    "services": ["služba 1", "služba 2"]
  },
  "posts": [
    {
      "type": "organic",
      "text": "Text příspěvku v přirozené češtině, max 150 slov. Piš jako majitel firmy, ne jako marketingová agentura.",
      "hashtags": "#relevantní #české #hashtagy"
    }
  ]
}

PRAVIDLA:
- Piš přirozenou češtinou, jako lokální firma
- Žádné fráze jako "Vaše spokojenost je naší prioritou"
- Max 2 emoji na příspěvek
- 10 organických (edukativní, emocionální, zákulisí, tipy) + 2 reklamní (CTA, akce)
- Hashtagy česky, 4-6 na příspěvek
- Vše uzpůsobené oboru firmy`
                }]
            })
        });

        const claudeData = await anthropicResponse.json();
        const responseText = claudeData.content[0].text;

        // Parse JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Invalid response format');
        }

        const result = JSON.parse(jsonMatch[0]);

        return res.status(200).json(result);

    } catch (error) {
        console.error('Generation error:', error);
        return res.status(500).json({
            error: 'Generování selhalo. Zkuste to prosím znovu.',
            details: error.message
        });
    }
}
