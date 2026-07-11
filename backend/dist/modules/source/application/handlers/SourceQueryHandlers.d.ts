import { GetSourceQuery, SearchSourcesQuery } from '../queries/SourceQueries';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
export declare class GetSourceHandler {
    private readonly repository;
    constructor(repository: ISourceRepository);
    handle(query: GetSourceQuery): Promise<Source | null>;
}
export declare class SearchSourcesHandler {
    private readonly repository;
    constructor(repository: ISourceRepository);
    handle(query: SearchSourcesQuery): Promise<Source[]>;
}
