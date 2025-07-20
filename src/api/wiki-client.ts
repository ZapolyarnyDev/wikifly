import axios from "axios";
import { WikiArticle } from "../models/wiki-article";
import { WikiArticleSection } from "../models/wiki-section";

export function searchWikiArticles(query: string): Promise<string[]>;
export function searchWikiArticles(query: string, limit: number): Promise<string[]>;
export function searchWikiArticles(query: string, limit: number, lang: string): Promise<string[]>;

export async function searchWikiArticles(
    query: string,
    max: number = 10,
    lang: string = "en"
): Promise<string[]> {

    const url = `https://${lang}.wikipedia.org/w/api.php`;
    const params = {
      action: "query",
      list: "search",
      srsearch: query,
      format: "json",
      origin: "*",
      srlimit: max
    };
  
    const response = await axios.get<any>(url, { params });
    return response.data.query.search.map((item: any) => item.title);
}

export async function fetchWikiArticle(title: string, lang: string = "en"): Promise<WikiArticle> {
    const url = `https://${lang}.wikipedia.org/w/api.php`;

    const params = {
      action: "parse",
      page: title,
      format: "json",
      origin: "*",
      prop: "text|sections|images",
    };

    const response = await axios.get<any>(url, {params});

    const articleData = response.data;

    const article = await getArticleFromData(articleData, lang);

    return article;
}

async function getArticleFromData(articleData: any, lang: string = "en"): Promise<WikiArticle> {
    const title = articleData.parse.title;

    return {
        title: title,
        intro: await fetchIntro(title, lang),
        imageUrl: await findArticleMainImage(title, lang),
        articleUrl: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title)}`,
        languageCode: lang,
        lastModified: await fetchArticleLastModified(title, lang),
        articleContent: mapSectionsToTree(articleData.parse.sections)
    };
}

function mapSectionsToTree(sections: any[]): WikiArticleSection[] {
    const rootSections: WikiArticleSection[] = [];
    const stack: { level: number; indexPath: number[]; section: WikiArticleSection }[] = [];
  
    for (const s of sections) {
      const level = parseInt(s.level);
  
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }
  
      const parent = stack.length > 0 ? stack[stack.length - 1].section : undefined;
  
      let currentIndex = 1;
      if (parent) {
        if (!parent.subSections) parent.subSections = [];
        currentIndex = parent.subSections.length + 1;
      } else {
        currentIndex = rootSections.length + 1;
      }
  
      const parentIndexPath = stack.length > 0 ? stack[stack.length - 1].indexPath : [];
      const indexPath = [...parentIndexPath, currentIndex];
      const numberPrefix = indexPath.join(".") + ". ";
  
      const section: WikiArticleSection = {
        title: numberPrefix + s.line,
        summary: undefined,
        subSections: []
      };
  
      if (parent) {
        parent.subSections.push(section);
      } else {
        rootSections.push(section);
      }
  
      stack.push({ level, indexPath, section });
    }
  
    return rootSections;
}


async function fetchArticleLastModified(title: string, lang: string = "en"): Promise<string | undefined> {
    const url = `https://${lang}.wikipedia.org/w/api.php`;

    const params = {
        action: "query",
        titles: title,
        prop: "revisions",
        rvprop: "timestamp",
        format: "json",
        origin: "*"
    };

    const response = await axios.get<any>(url, { params });
    const pages = response.data?.query?.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId]?.revisions?.[0]?.timestamp;
}

async function findArticleMainImage(title: string, lang: string = "en"): Promise<string | undefined> {
    const url = `https://${lang}.wikipedia.org/w/api.php`;

    const params = {
        action: "query",
        titles: title,
        prop: "pageimages",
        piprop: "original",
        format: "json",
        origin: "*"
    };

    const response = await axios.get<any>(url, { params });

    const pages = response.data?.query?.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId]?.original?.source;
}

async function fetchIntro(title: string, lang: string = "en"): Promise<string | undefined> {
    const url = `https://${lang}.wikipedia.org/w/api.php`;
    const params = {
      action: "query",
      prop: "extracts",
      titles: title,
      format: "json",
      origin: "*",
      explaintext: true,
      exintro: true
    };
  
    const response = await axios.get<any>(url, { params });
    const pages = response.data?.query?.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId]?.extract;
}  