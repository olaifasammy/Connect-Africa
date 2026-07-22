import { CreateSourceCommand } from '../commands/CreateSourceCommand';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { IAuditRepository } from '../../../audit/public';
export declare class CreateSourceHandler {
    private readonly repository;
    private readonly auditRepository;
    constructor(repository: ISourceRepository, auditRepository: IAuditRepository);
    handle(command: CreateSourceCommand): Promise<string>;
}
