import { IEntityTypeRepository, IRelationshipTypeRepository } from '../../../ontology/public';
export declare class ArticleOntologyValidator {
    private readonly entityTypeRepository;
    private readonly relationshipTypeRepository;
    constructor(entityTypeRepository: IEntityTypeRepository, relationshipTypeRepository: IRelationshipTypeRepository);
    validateEntityType(typeName: string): Promise<boolean>;
    validateRelationshipType(typeName: string): Promise<boolean>;
}
