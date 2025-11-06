package article

import (
	"testing"
	"time"
)

func TestArticle_Validate(t *testing.T) {
	tests := []struct {
		name    string
		article Article
		wantErr bool
	}{
		{
			name: "有効な記事",
			article: Article{
				Title:       "新しいプロジェクト",
				Link:        "https://www.hogepiyo/test.html",
				PublishedAt: time.Now(),
				Source:      "hogepiyo",
			},
			wantErr: false,
		},
		{
			name: "タイトルが空",
			article: Article{
				Title:       "",
				Link:        "https://www.hogepiyo/test.html",
				PublishedAt: time.Now(),
				Source:      "hogepiyo",
			},
			wantErr: true,
		},
		{
			name: "リンクが空",
			article: Article{
				Title:       "新しいプロジェクト",
				Link:        "",
				PublishedAt: time.Now(),
				Source:      "hogepiyo",
			},
			wantErr: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.article.Validate()
			if (err != nil) != tt.wantErr {
				t.Errorf("Validate() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
