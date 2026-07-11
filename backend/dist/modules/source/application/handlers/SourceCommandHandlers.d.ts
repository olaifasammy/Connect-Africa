import { UpdateSourceCommand, DeleteSourceCommand } from '../commands/SourceCommands';
import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { IAuditLogger } from '../../domain/interfaces/SourceServices';
export declare class UpdateSourceHandler {
    private readonly repository;
    private readonly auditLogger;
    constructor(repository: ISourceRepository, auditLogger: IAuditLogger);
    handle(command: UpdateSourceCommand): Promise<void>;
}
export declare class DeleteSourceHandler {
    private readonly repository;
    private readonly auditLogger;
    constructor(repository: ISourceRepository, auditLogger: IAuditLogger);
    handle(command: DeleteSourceCommand): Promise<void>;
}
