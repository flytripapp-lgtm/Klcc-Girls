import { Link } from '@tanstack/react-router'
import type { Post } from 'content-collections'

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
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return dateStr
  }
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <Link to="/posts/$slug" params={{ slug: post.slug }} className="block">
      <article
        className="post-card"
        style={{
          background: 'var(--color-card)',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(20,16,12,0.08)',
        }}
      >
        <div className="editorial-image" style={{ height: '420px' }}>
          <img src={`/${post.image}`} alt={post.title} style={{ position: 'absolute', inset: 0 }} />
          <div
            className="hero-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '2rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              {post.categories.map((cat) => (
                <span key={cat} className={`category-badge ${getCategoryClass(cat)}`}>
                  {cat}
                </span>
              ))}
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 700,
                color: '#F7F3ED',
                lineHeight: 1.2,
                margin: '0 0 0.6rem',
              }}
            >
              {post.title}
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(247,243,237,0.75)',
                margin: '0 0 0.5rem',
                lineHeight: 1.5,
                maxWidth: '600px',
              }}
            >
              {post.summary}
            </p>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-light)',
              }}
            >
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link to="/posts/$slug" params={{ slug: post.slug }} className="block" style={{ height: '100%' }}>
      <article
        className="post-card"
        style={{
          background: 'var(--color-card)',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(20,16,12,0.07)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="editorial-image" style={{ height: '220px', flexShrink: 0 }}>
          <img src={`/${post.image}`} alt={post.title} style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {post.categories.map((cat) => (
              <span key={cat} className={`category-badge ${getCategoryClass(cat)}`}>
                {cat}
              </span>
            ))}
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--color-ink)',
              lineHeight: 1.25,
              margin: '0.2rem 0',
            }}
          >
            {post.title}
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.82rem',
              color: 'var(--color-muted)',
              lineHeight: 1.55,
              margin: 0,
              flex: 1,
            }}
          >
            {post.summary}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span className="gold-divider" style={{ width: '24px' }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
              }}
            >
              {formatDate(post.date)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function BlogPosts({ title, posts }: { title: string; posts: Post[] }) {
  const [featured, ...rest] = posts

  return (
    <div className="max-w-6xl mx-auto px-6 py-10" style={{ minHeight: '60vh' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span className="gold-divider" />
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            margin: 0,
          }}
        >
          {title}
        </h1>
        <span className="gold-divider" />
      </div>

      {posts.length === 0 && (
        <p style={{ color: 'var(--color-muted)', fontFamily: "'Inter', sans-serif", fontSize: '0.9rem' }}>
          No stories found in this category.
        </p>
      )}

      {featured && (
        <div style={{ marginBottom: '2.5rem' }}>
          <FeaturedCard post={featured} />
        </div>
      )}

      {rest.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {rest.map((post) => (
            <PostCard key={post._meta.path} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
