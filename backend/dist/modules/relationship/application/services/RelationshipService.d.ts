import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { RelationshipValidationService } from '../../domain/services/RelationshipValidationService';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
/**
 * Application service orchestrating relationship operations with Audit and Event support.
 */
export declare class RelationshipService {
    private readonly repository;
    private readonly validationService;
    private readonly eventBus;
    constructor(repository: IRelationshipRepository, validationService: RelationshipValidationService, eventBus: EventBus);
    createRelationship(command: CreateRelationshipCommand): Promise<void>;
}
