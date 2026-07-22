import { CreateArticleCommand } from '../commands/CreateArticleCommand';
import { IArticleRepository } from '../../domain/repositories/IArticleRepository';
import { IAuditRepository } from '../../../audit/public';
export declare class CreateArticleHandler {
    private readonly repository;
    private readonly auditRepository;
    constructor(repository: IArticleRepository, auditRepository: IAuditRepository);
    handle(command: CreateArticleCommand): Promise<string>;
}
