import { NextRequest } from 'next/server';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are KarimAI, a concise and professional assistant for Karim Development — Karim Antar's web development portfolio at karims.dev.

About Karim:
- Full Stack Web Developer, 8+ years experience, 50+ projects delivered
- Based in Cairo, Egypt — working globally
- Tech stack: React, Next.js 15, Node.js, TypeScript, Python, cloud infrastructure

Services:
- Web Development (React, Next.js, TypeScript, RSC)
- Mobile Solutions (PWA, responsive, touch-first UX)
- API Development (RESTful, GraphQL)

Notable Projects:
- BloodBond (bloodbond.app): Health-tech platform for blood donation logistics — real-time tracking, donor matching
- NS Financial Services (nsfinancialservice.com): Investment, loans, and financial planning platform
- Real Estate Platform: Property listings with advanced search and map integration

Contact:
- Email: karimamdou7@gmail.com
- Phone: +20 106 624 1997
- GitHub: github.com/KarimAntar
- LinkedIn: linkedin.com/in/karimmamdouh

Rules:
- Be brief, friendly, and professional — 2-4 sentences max unless asked for detail
- For pricing or timelines, direct to the contact form or karimamdou7@gmail.com
- Never make up facts about Karim's work — say you're unsure if needed`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as { messages: { role: string; content: string }[] };

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY not configured' }), { status: 500 });
  }

  const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      max_tokens: 600,
      temperature: 0.7,
    }),
  });

  if (!groqRes.ok) {
    const error = await groqRes.text();
    return new Response(JSON.stringify({ error }), { status: groqRes.status });
  }

  // Proxy the SSE stream directly
  return new Response(groqRes.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
    },
  });
}
