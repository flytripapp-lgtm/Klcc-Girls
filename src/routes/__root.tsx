import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import Header from '@/components/Header'
import VacayAssistant from '@/components/VacayAssistant'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Wanderlust — Dispatches from the World' },
      {
        name: 'description',
        content: "Premium travel writing from the world's most compelling destinations.",
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--color-cream)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <footer
          style={{
            borderTop: '1px solid var(--color-border)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            backgroundColor: 'var(--color-ink)',
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'rgba(247,243,237,0.85)',
              marginBottom: '0.4rem',
            }}
          >
            Wanderlust
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: 0,
              color: 'rgba(247,243,237,0.45)',
            }}
          >
            Discover premium KLCC escort entertainment in Kuala Lumpur. Discreet, elegant companionship for dinners, events & nightlife..
          </p>
        </footer>
        <VacayAssistant />
        <Scripts />
      </body>
    </html>
  )
}
