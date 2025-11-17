# Space News Frontend

シンプルな静的フロントエンド

## ローカル開発

```bash
# シンプルなHTTPサーバーで起動
python3 -m http.server 3000

# または
npx serve .
```

ブラウザで http://localhost:3000 を開く

## API設定

`static/app.js` の `API_BASE_URL` を更新:

```javascript
const API_BASE_URL = 'https://api.space-news.space';
```
