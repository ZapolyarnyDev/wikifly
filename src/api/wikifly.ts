import { WikiArticle } from "../models/wiki-article";
import { fetchWikiArticle, searchWikiArticles } from "./wiki-client";

export const wikifly = {

  async search(query: string, limit?: number, lang: string = "en"): Promise<string[]> {
    return await searchWikiArticles(query, limit ?? 10, lang);
  },

  async get(title: string, lang: string = "en"): Promise<WikiArticle> {
    return await fetchWikiArticle(title, lang);
  }
}