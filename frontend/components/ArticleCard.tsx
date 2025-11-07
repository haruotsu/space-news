import type { Article } from '@/types/article';
import { formatDate, truncate } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group relative rounded-lg border border-white/20 bg-gradient-to-br from-orange-950/80 via-black/90 to-teal-950/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-white/10">

      {/* Source Badge */}
      <div className="mb-4 inline-flex items-center gap-3 relative z-10">
        <span className="rounded-sm bg-white/5 px-3 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/20 backdrop-blur-sm uppercase tracking-wider">
          {article.source}
        </span>
        <span className="text-xs text-gray-400 font-mono">{formatDate(article.published_at)}</span>
      </div>

      {/* Title */}
      <h2 className="mb-4 text-xl font-bold leading-tight relative z-10">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors group-hover:text-gray-200 drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]"
        >
          {article.title}
        </a>
      </h2>

      {/* Description */}
      {article.description && (
        <p className="mb-5 text-sm leading-relaxed text-gray-400 relative z-10">
          {truncate(article.description, 200)}
        </p>
      )}

      {/* Read More Link */}
      <div className="flex items-center justify-end relative z-10">
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition-all hover:gap-3 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
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

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-lg overflow-hidden">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        }} />
      </div>
    </article>
  );
}
