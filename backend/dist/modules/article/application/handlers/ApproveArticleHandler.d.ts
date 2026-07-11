import { ApproveArticleCommand } from '../commands/ApproveArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IAuditLogger } from '../../domain/interfaces/ArticleServices';
export declare class ApproveArticleHandler {
    private readonly repository;
    private readonly auditLogger;
    constructor(repository: IArticleRepository, auditLogger: IAuditLogger);
    handle(command: ApproveArticleCommand): Promise<void>;
}
