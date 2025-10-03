import { getArticles } from '@/lib/contentful'
import { ArticleCard } from '@/components/articles/ArticleCard'
import { Search, Filter } from 'lucide-react'

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Latest <span className="text-primary">Articles</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and insights from ShareLah
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.sys.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600">
                We're working on bringing you great content. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: 'Articles - ShareLah',
    description: 'Stay updated with the latest news, tips, and insights from ShareLah',
  }
}
