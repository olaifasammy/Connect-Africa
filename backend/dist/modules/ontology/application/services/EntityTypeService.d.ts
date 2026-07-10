import { IEntityTypeRepository } from '../../../ontology/domain/repositories/IEntityTypeRepository';
import { IOntologyRepository } from '../../../ontology/domain/repositories/IOntologyRepository';
import { EntityType } from '../../../ontology/domain/entities/EntityType';
import { EntityTypeValidator } from '../../../ontology/domain/validators/EntityTypeValidator';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class EntityTypeService {
    private readonly entityTypeRepository;
    private readonly ontologyRepository;
    private readonly entityTypeValidator;
    private readonly eventBus;
    constructor(entityTypeRepository: IEntityTypeRepository, ontologyRepository: IOntologyRepository, entityTypeValidator: EntityTypeValidator, eventBus: EventBus);
    createEntityType(ontologyId: string, dto: {
        name: string;
        description: string;
    }, userId?: string, ipAddress?: string): Promise<EntityType>;
    updateEntityType(id: string, dto: {
        name: string;
        description: string;
    }, userId?: string, ipAddress?: string): Promise<EntityType>;
    deleteEntityType(id: string, userId?: string, ipAddress?: string): Promise<void>;
}
