import { describe, expect, it } from "vitest";
import { wikifly } from '../src/api/wikifly.ts';

describe('wikifly', () => {
  it('search() should return results', async () => {
    const results = await wikifly.search('JavaScript');
    expect(results.length).toBeGreaterThan(0);
    expect(typeof results[0]).toBe('string');
  });

  it('get() should return article data', async () => {
    const article = await wikifly.get('JavaScript', 'en');
    expect(article.title).toContain('JavaScript');
    expect(article.intro).toBeDefined();
    expect(article.articleContent.length).toBeGreaterThan(0);
  });
});