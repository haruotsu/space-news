-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    description     TEXT,
    link            TEXT NOT NULL UNIQUE,
    published_at    TIMESTAMP WITH TIME ZONE NOT NULL,
    source          TEXT NOT NULL DEFAULT 'JAXA',
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_link ON articles(link);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policy for read access (allow all)
CREATE POLICY "Allow public read access" ON articles
    FOR SELECT
    USING (true);
