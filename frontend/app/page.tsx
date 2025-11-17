import { ArticlesList } from '@/components/ArticlesList';
import { StarField } from '@/components/StarField';
import { Planets } from '@/components/Planets';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black via-85% to-teal-950/30 relative overflow-hidden">
      {/* Star Field with Parallax Effect */}
      <StarField />

      {/* Planets */}
      <Planets />

      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Space News</h1>
                <p className="text-sm text-gray-400">
                  宇宙関連のニュースをまとめてお届け
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        <ArticlesList />
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-20 relative z-10">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <p className="text-center text-gray-400 text-sm">
            © 2025 Space News. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
