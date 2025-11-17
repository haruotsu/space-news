.PHONY: help build test test-verbose test-coverage run clean lint fmt deps dev docker-build docker-run db-up db-down db-migrate db-seed db-reset local-run

# デフォルトターゲット
help:
	@echo "Available targets:"
	@echo "  make build          - バイナリをビルド"
	@echo "  make test           - テストを実行"
	@echo "  make test-verbose   - 詳細なテスト実行"
	@echo "  make test-coverage  - カバレッジ付きテスト"
	@echo "  make run            - サーバーを起動"
	@echo "  make dev            - 開発モード (ホットリロード)"
	@echo "  make clean          - ビルド成果物を削除"
	@echo "  make lint           - コードの静的解析"
	@echo "  make fmt            - コードフォーマット"
	@echo "  make deps           - 依存パッケージをインストール"
	@echo "  make docker-build   - Dockerイメージをビルド"
	@echo "  make docker-run     - Dockerコンテナを起動"
	@echo ""
	@echo "Local Development:"
	@echo "  make db-up          - ローカルDBを起動"
	@echo "  make db-down        - ローカルDBを停止"
	@echo "  make db-migrate     - マイグレーションを実行"
	@echo "  make db-reset       - DBをリセット"
	@echo "  make local-run      - ローカル環境でサーバーを起動"

# 依存パッケージのインストール
deps:
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

# コードフォーマット
fmt:
	@echo "Formatting code..."
	go fmt ./...

# Linter実行
lint:
	@echo "Running linter..."
	@command -v golangci-lint >/dev/null 2>&1 || { \
		echo "golangci-lint not found. Installing..."; \
		go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest; \
	}
	golangci-lint run ./...

# ビルド
build:
	@echo "Building..."
	mkdir -p bin
	go build -o bin/api cmd/api/main.go
	@echo "Build complete: bin/api"

# テスト実行
test:
	@echo "Running tests..."
	go test ./... -short

# 詳細なテスト実行
test-verbose:
	@echo "Running tests (verbose)..."
	go test ./... -v -short

# カバレッジ付きテスト
test-coverage:
	@echo "Running tests with coverage..."
	mkdir -p coverage
	go test ./... -coverprofile=coverage/coverage.out -covermode=atomic
	go tool cover -html=coverage/coverage.out -o coverage/coverage.html
	@echo "Coverage report: coverage/coverage.html"

# サーバー起動
run: build
	@echo "Starting server..."
	./bin/api

# 開発モード (air使用)
dev:
	@command -v air >/dev/null 2>&1 || { \
		echo "air not found. Installing..."; \
		go install github.com/cosmtrek/air@latest; \
	}
	air

# クリーンアップ
clean:
	@echo "Cleaning..."
	rm -rf bin/
	rm -rf coverage/
	go clean
	@echo "Clean complete"

# CI用のテスト (全テスト実行)
ci-test:
	@echo "Running CI tests..."
	go test ./... -v -race -coverprofile=coverage.out -covermode=atomic

# ビルドの検証
ci-build:
	@echo "Verifying build..."
	go build -v ./...

# Dockerイメージのビルド
docker-build:
	@echo "Building Docker image..."
	docker build -t space-news:latest .
	@echo "Docker image built: space-news:latest"

# Dockerコンテナの起動
docker-run:
	@echo "Starting Docker container..."
	docker run --rm -it \
		-p 8080:8080 \
		-e DATABASE_URL="${DATABASE_URL}" \
		-e PORT=8080 \
		space-news:latest

# ローカルDB起動
db-up:
	@echo "Starting local PostgreSQL..."
	cd .. && docker-compose up -d db
	@echo "Waiting for database to be ready..."
	@sleep 3
	@echo "Database is ready!"

# ローカルDB停止
db-down:
	@echo "Stopping local PostgreSQL..."
	cd .. && docker-compose down
	@echo "Database stopped"

# マイグレーション実行
db-migrate:
	@echo "Running migrations..."
	@if [ ! -f .env ]; then \
		echo "Error: .env file not found. Copy .env.example to .env first."; \
		exit 1; \
	fi
	docker exec space-news-db psql -U postgres -d spacenews -f /docker-entrypoint-initdb.d/001_initial.sql || \
	docker exec -i space-news-db psql -U postgres -d spacenews < migrations/001_initial.sql
	@echo "Migration complete"

# シードデータ投入
db-seed:
	@echo "Seeding database..."
	@if [ ! -f .env ]; then \
		echo "Error: .env file not found. Copy .env.example to .env first."; \
		exit 1; \
	fi
	docker exec -i space-news-db psql -U postgres -d spacenews < migrations/002_seed.sql
	@echo "Seed data inserted"

# DBリセット
db-reset:
	@echo "Resetting database..."
	cd .. && docker-compose down -v
	cd .. && docker-compose up -d db
	@sleep 3
	$(MAKE) db-migrate
	@echo "Database reset complete"

# ローカル環境でサーバー起動
local-run: build
	@echo "Starting server with local database..."
	@if [ ! -f .env ]; then \
		echo "Error: .env file not found. Copy .env.example to .env first."; \
		exit 1; \
	fi
	@export $$(cat .env | grep -v '^#' | xargs) && ./bin/api
