import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
export declare class SearchSuggestionsQuery {
    readonly query: string;
    constructor(query: string);
}
export declare class SearchSuggestionsQueryHandler {
    private readonly repository;
    constructor(repository: SearchRepository);
    handle(query: SearchSuggestionsQuery): Promise<string[]>;
}
