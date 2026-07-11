import { RestoreArticleCommand } from '../commands/RestoreArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IRevisionRepository } from '../../domain/repositories/IRevisionRepository';
export declare class RestoreArticleHandler {
    private readonly repository;
    private readonly revisionRepository;
    constructor(repository: IArticleRepository, revisionRepository: IRevisionRepository);
    handle(command: RestoreArticleCommand): Promise<void>;
}
