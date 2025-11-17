import type { Article } from '@/types/article';

//API Routesの置き換える前に純粋にフロントエンドでの取得を行う実装する

const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
};

/**
 * 記事を取得する
 * @param limit 取得する記事数
 * @returns 記事の配列
 */
export async function fetchArticles(limit: number = 50): Promise<Article[]> {
  const apiBaseUrl = getApiBaseUrl();
  const response = await fetch(`${apiBaseUrl}/api/articles?limit=${limit}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const articles = await response.json();
  return articles;
}
