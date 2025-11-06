package rss

import (
	"testing"
)

func TestFetcher_FetchArticles(t *testing.T) {
	tests := []struct {
		name    string
		url     string
		wantErr bool
	}{
		{
			name:    "JAXAのRSSを取得できる",
			url:     "https://www.jaxa.jp/rss/press_j.rdf",
			wantErr: false,
		},
		{
			name:    "無効なURLの場合エラー",
			url:     "not-a-valid-url",
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			fetcher := NewFetcher()
			articles, err := fetcher.FetchArticles(tt.url, "JAXA")

			if (err != nil) != tt.wantErr {
				t.Errorf("FetchArticles() error = %v, wantErr %v", err, tt.wantErr)
				return
			}

			if !tt.wantErr && len(articles) == 0 {
				t.Error("FetchArticles() 記事が取得できませんでした")
			}

			// 最初の記事をチェック
			if !tt.wantErr && len(articles) > 0 {
				article := articles[0]
				if article.Title == "" {
					t.Error("FetchArticles() 記事のタイトルが空です")
				}
				if article.Link == "" {
					t.Error("FetchArticles() 記事のリンクが空です")
				}
				if article.Source != "JAXA" {
					t.Errorf("FetchArticles() 記事のソースが JAXA ではありません: %s", article.Source)
				}
			}
		})
	}
}
