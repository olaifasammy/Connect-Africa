import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';
export declare class BulkIndexCommand {
    readonly documents: SearchDocument[];
    constructor(documents: SearchDocument[]);
}
export declare class BulkIndexHandler {
    private readonly repository;
    constructor(repository: SearchRepository);
    handle(command: BulkIndexCommand): Promise<void>;
}
