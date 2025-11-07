import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  it('ページタイトルが表示される', () => {
    render(<Home />);
    expect(screen.getByText('Space News')).toBeInTheDocument();
  });

  it('ページの説明が表示される', () => {
    render(<Home />);
    expect(screen.getByText('宇宙関連のニュースをまとめてお届け')).toBeInTheDocument();
  });

  it('ArticlesListコンポーネントが含まれている', () => {
    const { container } = render(<Home />);
    // ArticlesListは読み込み中のテキストを表示するはず
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });
});
