import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ArticlesList } from './ArticlesList';
import { fetchArticles } from '@/lib/api';
import type { Article } from '@/types/article';

// APIをモック
vi.mock('@/lib/api', () => ({
  fetchArticles: vi.fn(),
}));

describe('ArticlesList', () => {
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

  it('ローディング状態が表示される', () => {
    vi.mocked(fetchArticles).mockImplementation(
      () => new Promise(() => {}) // 永続的にpending状態
    );

    render(<ArticlesList />);

    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  it('記事が正常に表示される', async () => {
    vi.mocked(fetchArticles).mockResolvedValue(mockArticles);

    render(<ArticlesList />);

    await waitFor(() => {
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
      expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    });
  });

  it('記事がない場合はメッセージが表示される', async () => {
    vi.mocked(fetchArticles).mockResolvedValue([]);

    render(<ArticlesList />);

    await waitFor(() => {
      expect(screen.getByText('記事がまだありません')).toBeInTheDocument();
    });
  });

  it('エラーが発生した場合はエラーメッセージが表示される', async () => {
    vi.mocked(fetchArticles).mockRejectedValue(new Error('API Error'));

    render(<ArticlesList />);

    await waitFor(() => {
      expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
    });
  });
});
