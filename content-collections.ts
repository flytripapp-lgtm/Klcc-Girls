import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  directory: 'content/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    categories: z.array(z.string()),
    slug: z.string().optional(),
    image: z.string(),
    date: z.union([z.string(), z.date()]).transform((d) =>
      d instanceof Date ? d.toISOString().split('T')[0] : d
    ),
    content: z.string(),
  }),
  transform: async (doc) => {
    return {
      ...doc,
      slug: doc.title
        .toLowerCase()
        .replace('.md', '')
        .replace(/[^\w\s-]+/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
    }
  },
})

export default defineConfig({
  collections: [posts],
})
