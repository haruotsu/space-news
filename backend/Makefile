.PHONY: help build test test-verbose test-coverage run clean lint fmt deps dev docker-build docker-run

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
