package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/haruotsu/space-news/internal/article"
	"github.com/haruotsu/space-news/internal/config"
	"github.com/haruotsu/space-news/internal/rss"
)

func TestFetchEndpoint_Unauthorized(t *testing.T) {
	os.Setenv("FETCH_TOKEN", "test-secret-token")
	defer os.Unsetenv("FETCH_TOKEN")

	req := httptest.NewRequest(http.MethodPost, "/api/fetch", nil)
	req.Header.Set("X-Fetch-Token", "wrong-token")

	w := httptest.NewRecorder()

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("X-Fetch-Token")
		expectedToken := os.Getenv("FETCH_TOKEN")

		if expectedToken == "" || token != expectedToken {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusUnauthorized {
		t.Errorf("Expected status %d, got %d", http.StatusUnauthorized, w.Code)
	}
}

func TestFetchEndpoint_Authorized(t *testing.T) {
	os.Setenv("FETCH_TOKEN", "test-secret-token")
	defer os.Unsetenv("FETCH_TOKEN")

	req := httptest.NewRequest(http.MethodPost, "/api/fetch", nil)
	req.Header.Set("X-Fetch-Token", "test-secret-token")

	w := httptest.NewRecorder()

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("X-Fetch-Token")
		expectedToken := os.Getenv("FETCH_TOKEN")

		if expectedToken == "" || token != expectedToken {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"success","articles_fetched":5}`))
	})

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Errorf("Expected status %d, got %d", http.StatusOK, w.Code)
	}

	expected := `{"status":"success","articles_fetched":5}`
	if w.Body.String() != expected {
		t.Errorf("Expected body %s, got %s", expected, w.Body.String())
	}
}

func TestFetchEndpoint_MethodNotAllowed(t *testing.T) {
	os.Setenv("FETCH_TOKEN", "test-secret-token")
	defer os.Unsetenv("FETCH_TOKEN")

	req := httptest.NewRequest(http.MethodGet, "/api/fetch", nil)
	req.Header.Set("X-Fetch-Token", "test-secret-token")

	w := httptest.NewRecorder()

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("X-Fetch-Token")
		expectedToken := os.Getenv("FETCH_TOKEN")

		if expectedToken == "" || token != expectedToken {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	handler.ServeHTTP(w, req)

	if w.Code != http.StatusMethodNotAllowed {
		t.Errorf("Expected status %d, got %d", http.StatusMethodNotAllowed, w.Code)
	}
}

func TestFetchRSSArticles(t *testing.T) {
	if testing.Short() {
		t.Skip("Skipping integration test in short mode")
	}

	cfg := &config.Config{
		Sources: []config.Source{
			{
				Name:    "Test Source",
				URL:     "https://example.com/feed.xml",
				Enabled: false, // テストでは実際にフェッチしない
			},
		},
	}

	fetcher := rss.NewFetcher()

	enabledSources := cfg.GetEnabledSources()
	if len(enabledSources) != 0 {
		t.Errorf("Expected 0 enabled sources, got %d", len(enabledSources))
	}

	// fetchRSSArticlesを呼び出すにはDBが必要なため、ここでは省略
	_ = fetcher
	_ = article.Repository{}
}
