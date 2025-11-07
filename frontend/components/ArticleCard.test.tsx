import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';
import type { Article } from '@/types/article';

describe('ArticleCard', () => {
  const mockArticle: Article = {
    source: 'NASA',
    title: 'テスト記事のタイトル',
    link: 'https://example.com/article',
    description: 'これはテスト記事の説明です。',
    published_at: '2025-01-15T00:00:00Z',
  };

  it('記事のタイトルが表示される', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('テスト記事のタイトル')).toBeInTheDocument();
  });

  it('記事のソースが表示される', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('NASA')).toBeInTheDocument();
  });

  it('記事の説明が表示される', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('これはテスト記事の説明です。')).toBeInTheDocument();
  });

  it('説明がない場合は説明が表示されない', () => {
    const articleWithoutDescription = { ...mockArticle, description: undefined };
    render(<ArticleCard article={articleWithoutDescription} />);
    expect(screen.queryByText('これはテスト記事の説明です。')).not.toBeInTheDocument();
  });

  it('記事のリンクが正しく設定される', () => {
    render(<ArticleCard article={mockArticle} />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://example.com/article');
    expect(links[0]).toHaveAttribute('target', '_blank');
    expect(links[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('「続きを読む」リンクが表示される', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText('続きを読む')).toBeInTheDocument();
  });
});
