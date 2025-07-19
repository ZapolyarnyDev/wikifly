export interface WikiArticleSection {
    readonly title: string, 
    readonly summary?: string,
    readonly subSections?: WikiArticleSection[]
}