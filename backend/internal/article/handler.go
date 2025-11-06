package article

import (
	"encoding/json"
	"net/http"
	"strconv"
)

// RepositoryInterface はリポジトリのインターフェース
type RepositoryInterface interface {
	GetAll(limit, offset int) ([]Article, error)
}

// Handler はHTTPリクエストを処理する
type Handler struct {
	repo RepositoryInterface
}

// NewHandler は新しいHandlerを作成する
func NewHandler(repo RepositoryInterface) *Handler {
	return &Handler{repo: repo}
}

// GetArticles は記事一覧を返す
func (h *Handler) GetArticles(w http.ResponseWriter, r *http.Request) {
	// クエリパラメータから limit と offset を取得
	limitStr := r.URL.Query().Get("limit")
	offsetStr := r.URL.Query().Get("offset")

	limit := 20 // デフォルト
	offset := 0 // デフォルト

	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 {
			limit = l
		}
	}

	if offsetStr != "" {
		if o, err := strconv.Atoi(offsetStr); err == nil && o >= 0 {
			offset = o
		}
	}

	articles, err := h.repo.GetAll(limit, offset)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(articles)
}

// Health はヘルスチェック用のエンドポイント
func (h *Handler) Health(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
