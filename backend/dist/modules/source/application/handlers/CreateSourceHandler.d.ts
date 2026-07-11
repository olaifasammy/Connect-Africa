import { CreateSourceCommand } from '../commands/CreateSourceCommand';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { IAuditLogger } from '../../domain/interfaces/SourceServices';
export declare class CreateSourceHandler {
    private readonly repository;
    private readonly auditLogger;
    constructor(repository: ISourceRepository, auditLogger: IAuditLogger);
    handle(command: CreateSourceCommand): Promise<string>;
}
