import { ArticleCard } from './ArticleCard';
import { fetchArticles } from '@/lib/api';
import type { Article } from '@/types/article';

/**
 * 記事一覧を表示するServer Component
 * useEffectを使わず、サーバーサイドでデータを取得する
 */
export async function ArticlesList() {
  let articles: Article[] = [];
  let errorMessage: string | null = null;

  try {
    articles = await fetchArticles();
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : 'Unknown error';
  }

  if (errorMessage) {
    return (
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-red-400 text-lg">⚠️ エラーが発生しました</p>
          <p className="mt-2 text-red-300 text-sm">{errorMessage}</p>
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
