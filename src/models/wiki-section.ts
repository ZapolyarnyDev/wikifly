export interface WikiArticleSection {
    readonly title: string, 
    readonly summary?: string,
    subSections: WikiArticleSection[]
}