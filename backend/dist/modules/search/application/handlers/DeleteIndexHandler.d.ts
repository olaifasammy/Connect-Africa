import { SearchRepository } from '../../infrastructure/repositories/SearchRepository';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class DeleteIndexCommand {
    readonly id: UniqueEntityId;
    constructor(id: UniqueEntityId);
}
export declare class DeleteIndexHandler {
    private readonly repository;
    constructor(repository: SearchRepository);
    handle(command: DeleteIndexCommand): Promise<void>;
}
