import { IRelationshipTypeRepository } from '../../../ontology/domain/repositories/IRelationshipTypeRepository';
import { IOntologyRepository } from '../../../ontology/domain/repositories/IOntologyRepository';
import { RelationshipType } from '../../../ontology/domain/entities/RelationshipType';
import { RelationshipTypeValidator } from '../../../ontology/domain/validators/RelationshipTypeValidator';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RelationshipTypeService {
    private readonly relationshipTypeRepository;
    private readonly ontologyRepository;
    private readonly relationshipTypeValidator;
    private readonly eventBus;
    constructor(relationshipTypeRepository: IRelationshipTypeRepository, ontologyRepository: IOntologyRepository, relationshipTypeValidator: RelationshipTypeValidator, eventBus: EventBus);
    createRelationshipType(ontologyId: string, dto: {
        name: string;
        description: string;
        sourceEntityTypeId: string;
        targetEntityTypeId: string;
    }, userId?: string, ipAddress?: string): Promise<RelationshipType>;
    updateRelationshipType(id: string, dto: {
        name: string;
        description: string;
    }, userId?: string, ipAddress?: string): Promise<RelationshipType>;
    deleteRelationshipType(id: string, userId?: string, ipAddress?: string): Promise<void>;
}
