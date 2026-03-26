import { createFileRoute, Link } from '@tanstack/react-router'
import { marked } from 'marked'
import { allPosts } from 'content-collections'

function getCategoryClass(cat: string): string {
  const map: Record<string, string> = {
    Islands: 'category-islands',
    Luxury: 'category-luxury',
    Food: 'category-food',
    City: 'category-city',
    Adventure: 'category-adventure',
    Mountains: 'category-mountains',
    Europe: 'category-europe',
    General: 'category-default',
  }
  return map[cat] ?? 'category-default'
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) throw new Error('Post not found')
    return post
  },
  component: RouteComponent,
})

function RouteComponent() {
  const post = Route.useLoaderData()
  const html = marked(post.content) as string

  return (
    <article>
      {/* Hero image with title overlay */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(340px, 55vh, 600px)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-ink)',
        }}
      >
        <img
          src={`/${post.image}`}
          alt={post.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 0.7,
          }}
        />
        <div
          className="hero-overlay"
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          <div className="max-w-4xl mx-auto w-full px-6 pb-10">
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.9rem', flexWrap: 'wrap' }}>
              {post.categories.map((cat) => (
                <Link
                  key={cat}
                  to="/category/$category"
                  params={{ category: cat }}
                  className={`category-badge ${getCategoryClass(cat)}`}
                  style={{ textDecoration: 'none' }}
                >
                  {cat}
                </Link>
              ))}
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#F7F3ED',
                lineHeight: 1.15,
                margin: '0 0 0.75rem',
                maxWidth: '800px',
              }}
            >
              {post.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="gold-divider" style={{ width: '30px' }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(247,243,237,0.7)',
                }}
              >
                {formatDate(post.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Standfirst / summary */}
          <p
            style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: '1.25rem',
              fontWeight: 300,
              color: 'var(--color-teal)',
              lineHeight: 1.65,
              marginBottom: '2.5rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--color-border)',
              fontStyle: 'italic',
            }}
          >
            {post.summary}
          </p>

          {/* Article text */}
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      {/* Back nav */}
      <div
        className="max-w-3xl mx-auto px-6 py-8"
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          ← All Stories
        </Link>
      </div>
    </article>
  )
}
