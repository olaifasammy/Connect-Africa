import { CreateArticleCommand } from '../commands/CreateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IAuditLogger } from '../../domain/interfaces/ArticleServices';
export declare class CreateArticleHandler {
    private readonly repository;
    private readonly auditLogger;
    constructor(repository: IArticleRepository, auditLogger: IAuditLogger);
    handle(command: CreateArticleCommand): Promise<string>;
}
