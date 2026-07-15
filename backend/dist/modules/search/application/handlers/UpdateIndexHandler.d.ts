import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { SearchDocument } from '../../domain/models/SearchDocument';
export declare class UpdateIndexCommand {
    readonly document: SearchDocument;
    constructor(document: SearchDocument);
}
export declare class UpdateIndexHandler {
    private readonly repository;
    constructor(repository: SearchRepository);
    handle(command: UpdateIndexCommand): Promise<void>;
}
