"use client";

import { useEffect, useState } from "react";
import { NewsArticle, NewsCard } from "./NewsCard";
import { Button } from "@/components/ui/button";

async function fetchNews(): Promise<NewsArticle[]> {
  const response = await fetch("https://api.sharelahsg.com/api/news");
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  const data = await response.json();
  return data;
}

export function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadNews() {
      try {
        const news = await fetchNews();
        setArticles(news);
        setFilteredArticles(news);
        const uniqueCategories = [...new Set(news.map(article => article.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
      }
    }
    loadNews();
  }, []);

  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredArticles(articles.filter(article => article.category === category));
    } else {
      setFilteredArticles(articles);
    }
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <div className="flex justify-center gap-2 mb-8">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => filterByCategory(null)}
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => filterByCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
