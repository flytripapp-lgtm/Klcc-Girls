import { createServerFileRoute } from '@tanstack/react-start/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export const ServerRoute = createServerFileRoute('/api/blog-chat').methods({
  POST: async ({ request }) => {
    try {
      const { messages, posts } = await request.json()

      const postsContext = posts
        .map(
          (p: { title: string; slug: string; summary: string; categories: string[]; date: string }) =>
            `- "${p.title}" (slug: ${p.slug}, categories: ${p.categories.join(', ')}, date: ${p.date}): ${p.summary}`
        )
        .join('\n')

      const systemPrompt = `You are a knowledgeable and enthusiastic travel assistant for Wanderlust, a premium travel magazine. You help readers discover stories, find destinations that match their interests, and navigate the magazine's content.

Available stories on the site:
${postsContext}

Guidelines:
- Be warm, evocative, and inspiring — write like a seasoned traveller
- When recommending articles, mention the slug so readers can find them at /posts/<slug>
- Keep responses concise (2–4 sentences usually), unless the reader asks for detail
- If asked about a destination not covered, acknowledge it warmly and suggest related content
- Never make up stories that don't exist in the list above`

      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 512,
        system: systemPrompt,
        messages: messages
          .filter((m: { role: string }) => m.role !== 'system')
          .map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: m.content,
          })),
      })

      const reply =
        response.content[0].type === 'text'
          ? response.content[0].text
          : 'I had trouble forming a response. Please try again.'

      return Response.json({ reply })
    } catch (err) {
      console.error('Blog chat error:', err)
      return Response.json(
        { reply: 'The assistant is temporarily unavailable. Please try again shortly.' },
        { status: 200 }
      )
    }
  },
})
