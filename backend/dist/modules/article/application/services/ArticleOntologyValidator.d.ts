import { IOntologyGraphService } from '../../../ontology/public';
export declare class ArticleOntologyValidator {
    private readonly ontologyGraphService;
    constructor(ontologyGraphService: IOntologyGraphService);
    validateEntityType(typeId: string): Promise<boolean>;
    validateRelationshipType(relationshipTypeId: string, sourceEntityTypeId: string, targetEntityTypeId: string): Promise<boolean>;
}
