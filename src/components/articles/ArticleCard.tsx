import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, User } from 'lucide-react'
import { Article } from '@/lib/contentful'

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { fields } = article
  const publishDate = new Date(fields.publicationDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Extract a preview from the rich text content
  const getContentPreview = (content: any) => {
    if (!content) return ''
    
    // Simple text extraction from rich text document
    const extractText = (node: any): string => {
      if (node.nodeType === 'text') {
        return node.value || ''
      }
      if (node.content) {
        return node.content.map(extractText).join('')
      }
      return ''
    }
    
    const text = extractText(content)
    return text.length > 150 ? text.substring(0, 150) + '...' : text
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <Link href={`/articles/${fields.slug}`}>
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-primary font-semibold text-lg">ShareLah</span>
          </div>
        </div>
      </Link>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/articles/${fields.slug}`}>
            {fields.title}
          </Link>
        </CardTitle>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{fields.author}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 line-clamp-3 mb-4">
          {getContentPreview(fields.content)}
        </p>
        
        {fields.tags && fields.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {fields.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
