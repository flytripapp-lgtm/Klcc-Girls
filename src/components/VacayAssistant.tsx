import { useState, useRef, useEffect } from 'react'
import { allPosts } from 'content-collections'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function VacayAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello, fellow traveller. I'm your guide to everything on Wanderlust. Ask me about destinations, adventures, food, or help finding a story that suits your mood.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/blog-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: next,
          posts: allPosts.map((p) => ({
            title: p.title,
            slug: p.slug,
            summary: p.summary,
            categories: p.categories,
            date: p.date,
          })),
        }),
      })
      const data = await res.json()
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: 'Apologies — I seem to have lost my connection. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open travel assistant"
        style={{
          position: 'fixed',
          bottom: '1.75rem',
          right: '1.75rem',
          zIndex: 50,
          width: '3.25rem',
          height: '3.25rem',
          borderRadius: '50%',
          background: 'var(--color-ink)',
          border: '2px solid var(--color-gold)',
          color: 'var(--color-cream)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(20,16,12,0.35)',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="chat-widget"
          style={{
            position: 'fixed',
            bottom: '5.5rem',
            right: '1.75rem',
            zIndex: 50,
            width: 'min(360px, calc(100vw - 2rem))',
            height: '480px',
            borderRadius: '8px',
            background: '#1A1510',
            border: '1px solid rgba(184,135,42,0.35)',
            boxShadow: '0 20px 60px rgba(20,16,12,0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid rgba(184,135,42,0.2)',
              background: '#120E0A',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-gold)', display: 'inline-block' }} />
              <span
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#F7F3ED',
                  letterSpacing: '0.01em',
                }}
              >
                Travel Assistant
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                color: 'rgba(247,243,237,0.45)',
                margin: '0.2rem 0 0 1.4rem',
                letterSpacing: '0.04em',
              }}
            >
              Ask about destinations & stories
            </p>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.65rem 0.9rem',
                    borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: m.role === 'user' ? 'var(--color-gold)' : 'rgba(255,255,255,0.07)',
                    color: m.role === 'user' ? '#14100C' : 'rgba(247,243,237,0.9)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.82rem',
                    lineHeight: 1.55,
                    fontWeight: m.role === 'user' ? 500 : 400,
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '12px 12px 12px 2px',
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(247,243,237,0.5)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ animation: 'pulse 1.5s ease infinite' }}>Thinking…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '0.75rem',
              borderTop: '1px solid rgba(184,135,42,0.15)',
              display: 'flex',
              gap: '0.5rem',
              background: '#120E0A',
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about adventures…"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(184,135,42,0.2)',
                borderRadius: '4px',
                padding: '0.5rem 0.75rem',
                color: '#F7F3ED',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? 'rgba(184,135,42,0.3)' : 'var(--color-gold)',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 0.85rem',
                color: '#14100C',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
