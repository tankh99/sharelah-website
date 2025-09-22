export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold text-lg mb-2">{article.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{new Date(article.createdAt).toLocaleDateString()}</p>
      <p className="text-sm">{article.content}</p>
      <span className="mt-4 inline-block bg-secondary text-white text-xs px-2 py-1 rounded-full">
        {article.category}
      </span>
    </div>
  );
}
