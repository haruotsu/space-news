package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/haruotsu/space-news/internal/article"
	"github.com/haruotsu/space-news/internal/config"
	"github.com/haruotsu/space-news/internal/rss"
	_ "github.com/lib/pq"
)

func main() {
	// 環境変数から設定を取得
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// データベース接続
	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// データベース接続確認
	if pingErr := db.Ping(); pingErr != nil {
		log.Fatalf("Failed to ping database: %v", pingErr)
	}
	log.Println("Database connected successfully")

	// 設定ファイルの読み込み
	cfg, err := config.LoadConfig("sources.yaml")
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// RSS取得とDB保存
	repo := article.NewRepository(db)
	fetcher := rss.NewFetcher()

	enabledSources := cfg.GetEnabledSources()
	log.Printf("Fetching from %d enabled sources...", len(enabledSources))

	totalArticles := 0
	for _, source := range enabledSources {
		log.Printf("Fetching from %s: %s", source.Name, source.URL)
		articles, err := fetcher.FetchArticles(source.URL, source.Name)
		if err != nil {
			log.Printf("Failed to fetch from %s: %v", source.Name, err)
			continue
		}

		// 記事をDBに保存
		for _, a := range articles {
			if err := repo.CreateOrUpdate(&a); err != nil {
				log.Printf("Failed to save article: %v", err)
			} else {
				totalArticles++
			}
		}
		log.Printf("Fetched and saved %d articles from %s", len(articles), source.Name)
	}

	log.Printf("Total articles saved: %d", totalArticles)

	// HTTPハンドラーのセットアップ
	handler := article.NewHandler(repo)

	// CORS設定
	corsHandler := func(next http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")

			allowedOrigins := map[string]bool{
				"https://space-news.space":     true,
				"https://www.space-news.space": true,
				"http://localhost:3000":        true,
			}

			frontendURL := os.Getenv("FRONTEND_URL")
			if frontendURL != "" {
				allowedOrigins[frontendURL] = true
			}

			if allowedOrigins[origin] {
				w.Header().Set("Access-Control-Allow-Origin", origin)
			}
			w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next(w, r)
		}
	}

	http.HandleFunc("/api/articles", corsHandler(handler.GetArticles))
	http.HandleFunc("/health", corsHandler(handler.Health))

	// サーバー起動
	addr := fmt.Sprintf(":%s", port)
	log.Printf("Server starting on %s", addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
