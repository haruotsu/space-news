import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatDate, truncate } from './utils';

describe('truncate', () => {
  it('短い文字列はそのまま返す', () => {
    expect(truncate('短い文字列', 100)).toBe('短い文字列');
  });

  it('長い文字列は指定された長さで切り詰める', () => {
    const longText = 'これは非常に長いテキストです。'.repeat(10);
    const result = truncate(longText, 20);
    expect(result).toBe(longText.substring(0, 20) + '...');
    expect(result.length).toBe(23); // 20 + '...'
  });

  it('maxLength以下の文字列は...を追加しない', () => {
    expect(truncate('12345', 5)).toBe('12345');
  });
});

describe('formatDate', () => {
  beforeEach(() => {
    // 2025-01-15 12:00:00 JSTに固定
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00+09:00'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('1時間以内は「たった今」を返す', () => {
    const thirtyMinutesAgo = new Date('2025-01-15T11:30:00+09:00').toISOString();
    expect(formatDate(thirtyMinutesAgo)).toBe('たった今');
  });

  it('1時間前は「1時間前」を返す', () => {
    const oneHourAgo = new Date('2025-01-15T11:00:00+09:00').toISOString();
    expect(formatDate(oneHourAgo)).toBe('1時間前');
  });

  it('5時間前は「5時間前」を返す', () => {
    const fiveHoursAgo = new Date('2025-01-15T07:00:00+09:00').toISOString();
    expect(formatDate(fiveHoursAgo)).toBe('5時間前');
  });

  it('1日前は「1日前」を返す', () => {
    const oneDayAgo = new Date('2025-01-14T12:00:00+09:00').toISOString();
    expect(formatDate(oneDayAgo)).toBe('1日前');
  });

  it('3日前は「3日前」を返す', () => {
    const threeDaysAgo = new Date('2025-01-12T12:00:00+09:00').toISOString();
    expect(formatDate(threeDaysAgo)).toBe('3日前');
  });

  it('7日以上前は日付形式で返す', () => {
    const eightDaysAgo = new Date('2025-01-07T12:00:00+09:00').toISOString();
    const result = formatDate(eightDaysAgo);
    expect(result).toContain('2025');
    expect(result).toContain('1月');
    expect(result).toContain('7日');
  });
});
