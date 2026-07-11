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
}
exports.OntologyValidator = OntologyValidator;
//# sourceMappingURL=OntologyValidator.js.map