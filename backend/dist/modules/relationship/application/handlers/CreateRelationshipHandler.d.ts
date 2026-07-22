import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { IOntologyService, IEventBus } from '../../domain/interfaces/RelationshipServices';
import { IAuditRepository } from '../../../audit/public';
export declare class CreateRelationshipHandler {
    private readonly repository;
    private readonly ontologyService;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(repository: IRelationshipRepository, ontologyService: IOntologyService, auditRepository: IAuditRepository, eventBus: IEventBus);
    handle(command: CreateRelationshipCommand): Promise<string>;
}
