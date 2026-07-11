import { PublishArticleCommand } from '../commands/PublishArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IAuditLogger } from '../../domain/interfaces/ArticleServices';
export declare class PublishArticleHandler {
    private readonly repository;
    private readonly auditLogger;
    constructor(repository: IArticleRepository, auditLogger: IAuditLogger);
    handle(command: PublishArticleCommand): Promise<void>;
}
