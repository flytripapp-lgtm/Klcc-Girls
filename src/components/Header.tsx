import { Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'

const allCategories = Array.from(
  new Set(allPosts.flatMap((p) => p.categories))
).sort()

export default function SiteHeader() {
  return (
    <header style={{ backgroundColor: 'var(--color-card)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="masthead-rule" />
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col items-center gap-1">
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            fontWeight: 400,
          }}
        >
          KLCC GIRLS ESCORT SERVICES AND ONLINE DATING WEB APPS.
        </div>
        <Link to="/">
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: 'var(--color-ink)',
              margin: 0,
              lineHeight: 1,
              cursor: 'pointer',
            }}
          >
            Klcc Girls
          </h1>
        </Link>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            fontWeight: 500,
            marginTop: '2px',
          }}
        >
          Dispatches from the World
        </div>
      </div>

      {/* Category nav */}
      <nav
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-ink)',
          padding: '0 1.5rem',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center gap-0 overflow-x-auto">
          <Link
            to="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-cream)',
              padding: '0.7rem 1rem',
              display: 'block',
              whiteSpace: 'nowrap',
              opacity: 0.85,
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
            activeProps={{ style: { opacity: 1, borderBottom: '2px solid var(--color-gold)' } }}
            activeOptions={{ exact: true }}
          >
            All Stories
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat}
              to="/category/$category"
              params={{ category: cat }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-cream)',
                padding: '0.7rem 1rem',
                display: 'block',
                whiteSpace: 'nowrap',
                opacity: 0.7,
                textDecoration: 'none',
                transition: 'opacity 0.15s',
              }}
              activeProps={{ style: { opacity: 1, borderBottom: '2px solid var(--color-gold)', color: 'var(--color-cream)' } }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
