import type { Article } from '@/types/article';

// APIのベースURL
const getApiBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost'
      ? 'http://localhost:8080'
      : 'https://api.space-news.space';
  }
  // サーバーサイドでは環境変数またはデフォルト値を使用
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
};

/**
 * 記事を取得する
 * @param limit 取得する記事数
 * @returns 記事の配列
 */
export async function fetchArticles(limit: number = 50): Promise<Article[]> {
  const apiBaseUrl = "https://api.space-news.space";
  const response = await fetch(`${apiBaseUrl}/api/articles?limit=${limit}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const articles = await response.json();
  return articles;
}
