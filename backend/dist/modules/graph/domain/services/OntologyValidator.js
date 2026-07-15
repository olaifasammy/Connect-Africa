"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyValidator = void 0;
const GraphErrors_1 = require("../errors/GraphErrors");
class OntologyValidator {
    ontologyGraphService;
    constructor(ontologyGraphService) {
        this.ontologyGraphService = ontologyGraphService;
    }
    async validateNode(type) {
        const isValid = await this.ontologyGraphService.validateEntityType(type);
        if (!isValid) {
            throw new GraphErrors_1.GraphValidationError(`Invalid entity type: ${type}`);
        }
    }
    async validateEdge(type, sourceTypeId, targetTypeId) {
        const isValid = await this.ontologyGraphService.validateRelationshipType(type, sourceTypeId, targetTypeId);
        if (!isValid) {
            throw new GraphErrors_1.GraphValidationError(`Invalid relationship type or incompatible entity types: ${type}`);
        }
    }
    async validateCardinality(type, sourceTypeId) {
        const isAllowed = await this.ontologyGraphService.validateCardinality(type, sourceTypeId);
        if (!isAllowed) {
            throw new GraphErrors_1.GraphValidationError(`Cardinality violation for relationship type: ${type}`);
        }
    }
    async validateMetadata(type, metadata) {
        const isSchemaValid = await this.ontologyGraphService.validateMetadataSchema(type, metadata);
        if (!isSchemaValid) {
            throw new GraphErrors_1.GraphValidationError(`Metadata schema violation for type: ${type}`);
        }
    }
}
exports.OntologyValidator = OntologyValidator;
//# sourceMappingURL=OntologyValidator.js.map