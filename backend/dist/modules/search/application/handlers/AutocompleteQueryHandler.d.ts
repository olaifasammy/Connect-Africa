import { AutocompleteQuery } from '../queries/AutocompleteQuery';
import { ISearchRepository } from '../../domain/repositories/ISearchRepository';
export declare class AutocompleteQueryHandler {
    private readonly searchRepository;
    constructor(searchRepository: ISearchRepository);
    handle(query: AutocompleteQuery): Promise<string[]>;
}
