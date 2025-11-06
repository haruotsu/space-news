// APIのベースURL (環境変数から取得、デフォルトはlocalhost)
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8080'
    : 'https://your-api-url.onrender.com';

// 記事を取得して表示
async function fetchArticles() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const articlesEl = document.getElementById('articles');

    try {
        const response = await fetch(`${API_BASE_URL}/api/articles?limit=50`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const articles = await response.json();

        loadingEl.style.display = 'none';

        if (!articles || articles.length === 0) {
            articlesEl.innerHTML = '<p style="color: white; text-align: center;">記事がまだありません</p>';
            return;
        }

        articlesEl.innerHTML = articles.map(article => `
            <div class="article-card">
                <span class="article-source">${escapeHtml(article.source)}</span>
                <h2 class="article-title">
                    <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener noreferrer">
                        ${escapeHtml(article.title)}
                    </a>
                </h2>
                ${article.description ? `
                    <p class="article-description">${escapeHtml(truncate(article.description, 200))}</p>
                ` : ''}
                <div class="article-meta">
                    <span class="article-date">${formatDate(article.published_at)}</span>
                    <a href="${escapeHtml(article.link)}" target="_blank" rel="noopener noreferrer" class="article-link">
                        続きを読む →
                    </a>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error fetching articles:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.textContent = `エラーが発生しました: ${error.message}`;
    }
}

// HTMLエスケープ
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 文字列を指定された長さで切り詰め
function truncate(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.substr(0, maxLength) + '...';
}

// 日付をフォーマット
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
        return 'たった今';
    } else if (diffHours < 24) {
        return `${diffHours}時間前`;
    } else if (diffDays < 7) {
        return `${diffDays}日前`;
    } else {
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// ページ読み込み時に記事を取得
document.addEventListener('DOMContentLoaded', fetchArticles);
