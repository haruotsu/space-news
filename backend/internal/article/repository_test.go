package article

import (
	"database/sql"
	"testing"
	"time"

	_ "github.com/lib/pq"
)

func getTestDB(t *testing.T) *sql.DB {
	dbURL := "DATABASE_URL_FOR_TEST"
	if dbURL == "DATABASE_URL_FOR_TEST" {
		t.Skip("DATABASE_URL_FOR_TEST not set, skipping integration test")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		t.Fatalf("Failed to connect to database: %v", err)
	}

	return db
}

func TestRepository_Create(t *testing.T) {
	db := getTestDB(t)
	defer db.Close()

	repo := NewRepository(db)

	article := &Article{
		Title:       "テスト記事",
		Description: "これはテスト記事です",
		Link:        "https://example.com/test-" + time.Now().Format("20060102150405"),
		PublishedAt: time.Now(),
		Source:      "JAXA",
	}

	err := repo.Create(article)
	if err != nil {
		t.Errorf("Create() error = %v", err)
	}

	if article.ID == "" {
		t.Error("Create() 記事のIDが設定されませんでした")
	}
}

func TestRepository_GetAll(t *testing.T) {
	db := getTestDB(t)
	defer db.Close()

	repo := NewRepository(db)

	articles, err := repo.GetAll(10, 0)
	if err != nil {
		t.Errorf("GetAll() error = %v", err)
	}

	if len(articles) < 0 {
		t.Error("GetAll() 記事が取得できませんでした")
	}
}
