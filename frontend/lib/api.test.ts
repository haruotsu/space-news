import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchArticles } from './api';
import type { Article } from '@/types/article';

// global.fetchをモック
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('fetchArticles', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('APIからarticlesを取得できる', async () => {
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
        published_at: '2025-01-14T00:00:00Z',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockArticles,
    });

    const result = await fetchArticles();

    expect(result).toEqual(mockArticles);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('https://api.space-news.space/api/articles?limit=50');
  });

  it('APIエラー時にエラーをthrowする', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchArticles()).rejects.toThrow('HTTP error! status: 500');
  });

  it('ネットワークエラー時にエラーをthrowする', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchArticles()).rejects.toThrow('Network error');
  });

  it('空の配列が返ってきた場合は空の配列を返す', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const result = await fetchArticles();

    expect(result).toEqual([]);
  });
});
