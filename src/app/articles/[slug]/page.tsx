import { getArticleBySlug, getArticles } from '@/lib/contentful'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import { notFound } from 'next/navigation'
import { RichTextRenderer } from '@/components/articles/RichTextRenderer'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const { fields } = article
  const publishDate = new Date(fields.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Estimate reading time (assuming 200 words per minute)
  const getWordCount = (content: any): number => {
    if (!content) return 0
    
    const extractText = (node: any): string => {
      if (node.nodeType === 'text') {
        return node.value || ''
      }
      if (node.content) {
        return node.content.map(extractText).join(' ')
      }
      return ''
    }
    
    const text = extractText(content)
    return text.split(' ').filter(word => word.length > 0).length
  }
  
  const wordCount = getWordCount(fields.content)
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              {fields.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{publishDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{fields.author}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {fields.tags && fields.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {fields.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="mb-8">
            <RichTextRenderer content={fields.content} />
          </article>

          {/* Author Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {fields.author}
                </h3>
                <p className="text-gray-600 text-sm">
                  Published on {publishDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const articles = await getArticles()
  
  return articles.map((article) => ({
    slug: article.fields.slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found - ShareLah',
    }
  }

  return {
    title: `${article.fields.title} - ShareLah`,
    description: `Article by ${article.fields.author}`,
  }
}
