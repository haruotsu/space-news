'use client';

import { useEffect, useState } from 'react';
import { ArticleCard } from './ArticleCard';
import { fetchArticles } from '@/lib/api';
import type { Article } from '@/types/article';

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-white text-lg">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-400 text-lg">
            ⚠️ エラーが発生しました
          </p>
          <p className="mt-2 text-red-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <div className="text-center">
          <p className="text-white text-xl mb-2">📭</p>
          <p className="text-gray-400">記事がまだありません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 w-full md:grid-cols-1 lg:grid-cols-1">
      {articles.map((article, index) => (
        <ArticleCard key={`${article.link}-${index}`} article={article} />
      ))}
    </div>
  );
}
