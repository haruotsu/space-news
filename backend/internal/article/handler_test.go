package article

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

// MockRepository はテスト用のモックリポジトリ
type MockRepository struct {
	articles []Article
}

func (m *MockRepository) GetAll(limit, offset int) ([]Article, error) {
	if offset >= len(m.articles) {
		return []Article{}, nil
	}

	end := offset + limit
	if end > len(m.articles) {
		end = len(m.articles)
	}

	return m.articles[offset:end], nil
}

func TestHandler_GetArticles(t *testing.T) {
	// モックデータ
	mockRepo := &MockRepository{
		articles: []Article{
			{
				ID:     "1",
				Title:  "テスト記事1",
				Link:   "https://example.com/1",
				Source: "hogepiyo",
			},
			{
				ID:     "2",
				Title:  "テスト記事2",
				Link:   "https://example.com/2",
				Source: "hogepiyo",
			},
		},
	}

	handler := NewHandler(mockRepo)

	req := httptest.NewRequest(http.MethodGet, "/api/articles", nil)
	w := httptest.NewRecorder()

	handler.GetArticles(w, req)

	res := w.Result()
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", res.StatusCode)
	}

	var articles []Article
	if err := json.NewDecoder(res.Body).Decode(&articles); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if len(articles) != 2 {
		t.Errorf("expected 2 articles, got %d", len(articles))
	}

	if articles[0].Title != "テスト記事1" {
		t.Errorf("expected first article title 'テスト記事1', got '%s'", articles[0].Title)
	}
}

func TestHandler_Health(t *testing.T) {
	handler := NewHandler(nil)

	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	w := httptest.NewRecorder()

	handler.Health(w, req)

	res := w.Result()
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", res.StatusCode)
	}

	var response map[string]string
	if err := json.NewDecoder(res.Body).Decode(&response); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if response["status"] != "ok" {
		t.Errorf("expected status 'ok', got '%s'", response["status"])
	}
}
