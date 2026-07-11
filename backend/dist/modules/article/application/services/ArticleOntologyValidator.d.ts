import { IEntityTypeRepository } from '../../../ontology/domain/repositories/IEntityTypeRepository';
import { IRelationshipTypeRepository } from '../../../ontology/domain/repositories/IRelationshipTypeRepository';
export declare class ArticleOntologyValidator {
    private readonly entityTypeRepository;
    private readonly relationshipTypeRepository;
    constructor(entityTypeRepository: IEntityTypeRepository, relationshipTypeRepository: IRelationshipTypeRepository);
    validateEntityType(typeName: string): Promise<boolean>;
    validateRelationshipType(typeName: string): Promise<boolean>;
}
