export declare class GetLatestArticlesQuery {
    readonly limit: number;
    constructor(limit?: number);
}
export declare class GetArticlesByEntityQuery {
    readonly entityId: UniqueEntityId;
    constructor(entityId: UniqueEntityId);
}
export declare class GetArticlesByCategoryQuery {
    readonly category: string;
    constructor(category: string);
}
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class GetArticleQuery {
    readonly articleId: UniqueEntityId;
    constructor(articleId: UniqueEntityId);
}
export declare class GetArticleBySlugQuery {
    readonly slug: string;
    constructor(slug: string);
}
export declare class SearchArticlesQuery {
    readonly searchTerm: string;
    constructor(searchTerm: string);
}
