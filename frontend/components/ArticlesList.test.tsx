import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticlesList } from './ArticlesList';
import { fetchArticles } from '@/lib/api';
import type { Article } from '@/types/article';

// APIをモック
vi.mock('@/lib/api', () => ({
  fetchArticles: vi.fn(),
}));

/**
 * ArticlesListのテスト（Server Component）
 *
 * ArticlesListはServer Componentとして実装されており、
 * 非同期でデータを取得します。Server Componentsのテストでは、
 * コンポーネントを await で呼び出す必要があります。
 */
describe('ArticlesList (Server Component)', () => {
  const mockArticles: Article[] = [
    {
      source: 'NASA',
      title: 'Test Article 1',
      link: 'https://example.com/1',
      description: 'Description 1',
      published_at: '2025-01-15T00:00:00Z',
    },
    {
      source: 'JAXA',
      title: 'Test Article 2',
      link: 'https://example.com/2',
      description: 'Description 2',
      published_at: '2025-01-14T00:00:00Z',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('記事が正常に表示される', async () => {
    vi.mocked(fetchArticles).mockResolvedValue(mockArticles);

    render(await ArticlesList());

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  it('記事がない場合はメッセージが表示される', async () => {
    vi.mocked(fetchArticles).mockResolvedValue([]);

    render(await ArticlesList());

    expect(screen.getByText('記事がまだありません')).toBeInTheDocument();
  });

  it('エラーが発生した場合はエラーメッセージが表示される', async () => {
    vi.mocked(fetchArticles).mockRejectedValue(new Error('API Error'));

    render(await ArticlesList());

    expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
  });
});
