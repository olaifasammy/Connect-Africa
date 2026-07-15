import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';
export declare class IndexDocumentCommand {
    readonly document: SearchDocument;
    constructor(document: SearchDocument);
}
export declare class IndexDocumentHandler {
    private readonly repository;
    constructor(repository: SearchRepository);
    handle(command: IndexDocumentCommand): Promise<void>;
}
