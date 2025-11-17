# Space News - Backend API

Go言語で実装されたバックエンドAPI

## 開発

### ローカル開発環境のセットアップ

```bash
cd backend

# 1. 依存パッケージのインストール
make deps

# 2. 環境変数の設定
cp .env.example .env
# .envファイルの内容はローカル開発用に設定済み

# 3. ローカルPostgreSQLの起動
make db-up

# 4. マイグレーションの実行
make db-migrate

# 5. モックデータの投入(オプション)
make db-seed

# 6. サーバーの起動
make local-run
```

### 本番環境のセットアップ

```bash
cd backend

# 依存パッケージのインストール
make deps

# 環境変数の設定
export DATABASE_URL="postgresql://[supabase-connection-string]"
export PORT=8080

# サーバー起動
make run
```

### 開発コマンド

#### ビルド・テスト
```bash
make help           # 利用可能なコマンドを表示
make build          # ビルド
make test           # テスト実行
make test-coverage  # カバレッジ付きテスト
make dev            # 開発モード (ホットリロード)
make lint           # 静的解析
make fmt            # コードフォーマット
```

#### ローカルDB管理
```bash
make db-up          # ローカルDBを起動
make db-down        # ローカルDBを停止
make db-migrate     # マイグレーションを実行
make db-seed        # モックデータを投入
make db-reset       # DBをリセット(全データ削除)
make local-run      # ローカル環境でサーバーを起動
```

## API エンドポイント

### 記事一覧取得
```
GET /api/articles?limit=20&offset=0
```

### ヘルスチェック
```
GET /health
```
