import type { Article } from '@/types/article';
import { formatDate, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group relative rounded-xl border border-blue-500/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Source Badge */}
      <div className="mb-3 inline-flex items-center gap-2">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20">
          {article.source}
        </span>
        <span className="text-xs text-gray-500">{formatDate(article.published_at)}</span>
      </div>

      {/* Title */}
      <h2 className="mb-3 text-xl font-bold leading-tight">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors group-hover:text-blue-400"
        >
          {article.title}
        </a>
      </h2>

      {/* Description */}
      {article.description && (
        <p className="mb-4 text-sm leading-relaxed text-gray-400">
          {truncate(article.description, 200)}
        </p>
      )}

      {/* Read More Link */}
      <div className="flex items-center justify-end">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-all hover:gap-3 hover:text-blue-300"
        >
          続きを読む
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </article>
  );
}
