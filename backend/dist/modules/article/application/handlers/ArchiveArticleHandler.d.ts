import { ArchiveArticleCommand } from '../commands/ArchiveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
export declare class ArchiveArticleHandler {
    private readonly repository;
    constructor(repository: IArticleRepository);
    handle(command: ArchiveArticleCommand): Promise<void>;
}
