import { Article } from '../../domain/entities/Article';
export interface ArticleSearchDocument {
    id: string;
    title: string;
    summary: string;
    content: string;
    tags: string[];
    categories: string[];
    status: string;
}
export declare class ArticleSearchIndexer {
    static toDocument(article: Article): ArticleSearchDocument;
}
