import { describe, it, expect, vi } from 'vitest';

/**
 * Server Componentsのテストについて：
 *
 * Next.js App RouterのServer Componentsは、従来のReact Testing Libraryでは
 * テストが困難です。Server Componentsは非同期でレンダリングされ、
 * クライアント側のテスト環境では正しく動作しません。
 *
 * Server Componentsのテストには以下のアプローチが推奨されます：
 * 1. E2Eテスト（Playwright、Cypressなど）
 * 2. 統合テスト（実際のサーバーを起動してテスト）
 * 3. ユニットテスト（Server Componentsが使用する関数やAPIを個別にテスト）
 *
 * 現在のアプローチ：
 * - API Routesのユニットテストは別途実施済み（app/api/articles/__tests__/route.test.ts）
 * - Server Components自体のテストはE2Eテストに委ねる
 */

describe('Home (Server Component)', () => {
  it.skip('Server Componentsのテストはスキップ（E2Eテストで実施予定）', () => {
    // Server Componentsのテストは、E2Eテストで実施する
    expect(true).toBe(true);
  });
});
