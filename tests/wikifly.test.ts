import { describe, expect, it } from "vitest";
import { wikifly } from '../src/api/wikifly.ts';

describe('wikifly-search', () => {
  it('search() should return results for an existing term', async () => {
    const results = await wikifly.search('JavaScript');
    expect(results.length).toBeGreaterThan(0);
    expect(typeof results[0]).toBe('string');
  });

  it('search() should return 3 search results for an existing term', async () => {
    const results = await wikifly.search('JavaScript', 3);
    expect(results.length).toBe(3);
  });

  it('search() should return empty array for for a non-existent term', async () => {
    const results = await wikifly.search("SAJSALSW");
    expect(results.length).toBe(0);
  });
});

describe('wikifly-get', () => {
  it('get() should return article data', async () => {
    const article = await wikifly.get('JavaScript', 'en');
    expect(article.title).toContain('JavaScript');
    expect(article.intro).toBeDefined();
    expect(article.articleContent.length).toBeGreaterThan(0);
  });

  it('get() should return a valid imageUrl for known article', async () => {
    const article = await wikifly.get('JavaScript', 'en');
    expect(article.imageUrl).toBeDefined();
    expect(article.imageUrl).toMatch(/^https?:\/\//);
  });

  it('get() should return lastModified as ISO string', async () => {
    const article = await wikifly.get('JavaScript', 'en');
    expect(article.lastModified).toBeDefined();
    expect(new Date(article.lastModified!).toString()).not.toBe('Invalid Date');
  });
});