import { WikiArticleSection } from "./wiki-section";

export interface WikiArticle {
    readonly title: string,
    readonly intro?: string,
    readonly imageUrl?: string,
    readonly articleUrl: string,
    readonly languageCode: string,
    readonly lastModified?: string,
    readonly articleContent: WikiArticleSection[]
}