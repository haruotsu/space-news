package article

import (
	"database/sql"
	"time"
)

// Repository は記事のデータアクセスを行う
type Repository struct {
	db *sql.DB
}

// NewRepository は新しいRepositoryを作成する
func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

// Create は新しい記事をデータベースに保存する
func (r *Repository) Create(article *Article) error {
	query := `
		INSERT INTO articles (title, description, link, published_at, source)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id, created_at
	`

	err := r.db.QueryRow(
		query,
		article.Title,
		article.Description,
		article.Link,
		article.PublishedAt,
		article.Source,
	).Scan(&article.ID, &article.CreatedAt)

	return err
}

// GetAll は記事の一覧を取得する
func (r *Repository) GetAll(limit, offset int) ([]Article, error) {
	query := `
		SELECT id, title, description, link, published_at, source, created_at
		FROM articles
		ORDER BY published_at DESC
		LIMIT $1 OFFSET $2
	`

	rows, err := r.db.Query(query, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []Article
	for rows.Next() {
		var a Article
		var description sql.NullString

		err := rows.Scan(
			&a.ID,
			&a.Title,
			&description,
			&a.Link,
			&a.PublishedAt,
			&a.Source,
			&a.CreatedAt,
		)
		if err != nil {
			return nil, err
		}

		if description.Valid {
			a.Description = description.String
		}

		articles = append(articles, a)
	}

	return articles, rows.Err()
}

// CreateOrUpdate は記事を作成または更新する (リンクで重複チェック)
func (r *Repository) CreateOrUpdate(article *Article) error {
	// まずリンクで検索
	var existingID string
	var existingCreatedAt time.Time

	checkQuery := `SELECT id, created_at FROM articles WHERE link = $1`
	err := r.db.QueryRow(checkQuery, article.Link).Scan(&existingID, &existingCreatedAt)

	if err == sql.ErrNoRows {
		// 存在しない場合は新規作成
		return r.Create(article)
	} else if err != nil {
		return err
	}

	// 既に存在する場合は何もしない
	article.ID = existingID
	article.CreatedAt = existingCreatedAt
	return nil
}
