import { createFileRoute } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import BlogPosts from '@/components/blog-posts'

// Sort posts by date descending
const sortedPosts = [...allPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return <BlogPosts title="Latest Dispatches" posts={sortedPosts} />
}
