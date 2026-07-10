import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { IOntologyService, IAuditLogger, IEventBus } from '../../domain/interfaces/RelationshipServices';
export declare class CreateRelationshipHandler {
    private readonly repository;
    private readonly ontologyService;
    private readonly auditLogger;
    private readonly eventBus;
    constructor(repository: IRelationshipRepository, ontologyService: IOntologyService, auditLogger: IAuditLogger, eventBus: IEventBus);
    handle(command: CreateRelationshipCommand): Promise<string>;
}
