export interface PublishArticleRequest {
    articleId: string;
}
export interface ArticleResponse {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    authorId: string;
    status: string;
    version: number;
    createdAt: string;
    updatedAt: string;
}
export interface ArticleSummaryResponse {
    id: string;
    title: string;
    slug: string;
    summary: string;
    authorId: string;
    status: string;
}
