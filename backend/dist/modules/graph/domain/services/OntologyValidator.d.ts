import { IOntologyGraphService } from '../../../ontology/public';
export declare class OntologyValidator {
    private readonly ontologyGraphService;
    constructor(ontologyGraphService: IOntologyGraphService);
    validateNode(type: string): Promise<void>;
    validateEdge(type: string, sourceTypeId: string, targetTypeId: string): Promise<void>;
    validateCardinality(type: string, sourceTypeId: string): Promise<void>;
    validateMetadata(type: string, metadata: Record<string, any>): Promise<void>;
}
