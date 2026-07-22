"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OntologyIntegrationService = void 0;
class OntologyIntegrationService {
    ontologyGraphService;
    constructor(ontologyGraphService) {
        this.ontologyGraphService = ontologyGraphService;
    }
    async validateRelationshipType(typeId, sourceEntityTypeId, targetEntityTypeId) {
        const isValid = await this.ontologyGraphService.validateRelationshipType(typeId, sourceEntityTypeId, targetEntityTypeId);
        if (!isValid) {
            throw new Error(`Invalid relationship type: ${typeId}`);
        }
    }
}
exports.OntologyIntegrationService = OntologyIntegrationService;
//# sourceMappingURL=OntologyIntegrationService.js.map