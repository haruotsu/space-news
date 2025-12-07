import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../route';
import { NextRequest } from 'next/server';

// グローバルfetchをモック
global.fetch = vi.fn();

describe('GET /api/articles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('正常にバックエンドAPIから記事データを取得できる', async () => {
    const mockArticles = [
      {
        title: 'テスト記事1',
        link: 'https://example.com/1',
        published: '2024-01-01T00:00:00Z',
        summary: 'テスト記事1の概要',
      },
      {
        title: 'テスト記事2',
        link: 'https://example.com/2',
        published: '2024-01-02T00:00:00Z',
        summary: 'テスト記事2の概要',
      },
    ];

    // fetchをモック
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockArticles,
    });

    const request = new NextRequest('http://localhost:3000/api/articles');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockArticles);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/articles?limit=50')
    );
  });

  it('limitパラメータが正しく渡される', async () => {
    const mockArticles = [{ title: 'テスト記事', link: 'https://example.com/1', published: '2024-01-01T00:00:00Z', summary: 'テスト' }];

    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockArticles,
    });

    const request = new NextRequest('http://localhost:3000/api/articles?limit=10');
    await GET(request);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/articles?limit=10')
    );
  });

  it('バックエンドAPIがエラーを返した場合、適切なエラーレスポンスを返す', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const request = new NextRequest('http://localhost:3000/api/articles');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });

  it('バックエンドAPIが利用できない場合、適切なエラーレスポンスを返す', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error')
    );

    const request = new NextRequest('http://localhost:3000/api/articles');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toHaveProperty('error');
  });
});
