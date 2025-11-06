package article

import (
	"errors"
	"time"
)

// Article は記事を表す構造体
type Article struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Link        string    `json:"link"`
	PublishedAt time.Time `json:"published_at"`
	Source      string    `json:"source"`
	CreatedAt   time.Time `json:"created_at"`
}

// Validate は記事のバリデーションを行う
func (a *Article) Validate() error {
	if a.Title == "" {
		return errors.New("title is required")
	}
	if a.Link == "" {
		return errors.New("link is required")
	}
	return nil
}
