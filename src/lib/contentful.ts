import { createClient } from 'contentful'
import { Document } from '@contentful/rich-text-types'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
})

export interface Article {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    slug: string
    content: Document // Rich Text field from Contentful
    author: string
    publicationDate: string
    tags?: string[]
  }
}

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await client.getEntries({
      content_type: 'article',
      order: ['-fields.publicationDate']
    })
    
    return response.items as unknown as Article[]
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await client.getEntries({
      content_type: 'article',
      'fields.slug': slug,
      limit: 1
    })
    
    return response.items[0] as unknown as Article || null
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}
