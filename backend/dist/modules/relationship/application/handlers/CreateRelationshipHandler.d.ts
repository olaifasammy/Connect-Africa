import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { IOntologyService } from '../../domain/interfaces/RelationshipServices';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class CreateRelationshipHandler {
    private readonly repository;
    private readonly ontologyService;
    private readonly eventBus;
    constructor(repository: IRelationshipRepository, ontologyService: IOntologyService, eventBus: EventBus);
    handle(command: CreateRelationshipCommand): Promise<string>;
}
