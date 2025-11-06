package rss

import (
	"github.com/haruotsu/space-news/internal/article"
	"github.com/mmcdole/gofeed"
)

// Fetcher はRSSフィードを取得する
type Fetcher struct {
	parser *gofeed.Parser
}

// NewFetcher は新しいFetcherを作成する
func NewFetcher() *Fetcher {
	return &Fetcher{
		parser: gofeed.NewParser(),
	}
}

// FetchArticles は指定されたURLからRSSフィードを取得し、記事のリストを返す
func (f *Fetcher) FetchArticles(url, sourceName string) ([]article.Article, error) {
	feed, err := f.parser.ParseURL(url)
	if err != nil {
		return nil, err
	}

	articles := make([]article.Article, 0, len(feed.Items))
	for _, item := range feed.Items {
		var description string
		if item.Description != "" {
			description = item.Description
		} else if item.Content != "" {
			description = item.Content
		}

		publishedAt := item.PublishedParsed
		if publishedAt == nil && item.UpdatedParsed != nil {
			publishedAt = item.UpdatedParsed
		}

		a := article.Article{
			Title:       item.Title,
			Description: description,
			Link:        item.Link,
			Source:      sourceName,
		}

		if publishedAt != nil {
			a.PublishedAt = *publishedAt
		}

		// バリデーション
		if err := a.Validate(); err != nil {
			continue // 無効な記事はスキップ
		}

		articles = append(articles, a)
	}

	return articles, nil
}
