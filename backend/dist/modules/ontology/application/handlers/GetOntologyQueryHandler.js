"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOntologyQueryHandler = void 0;
class GetOntologyQueryHandler {
    ontologyService;
    constructor(ontologyService) {
        this.ontologyService = ontologyService;
    }
    async handle(query) {
        const ontology = await this.ontologyService.getById(query.id);
        return {
            id: ontology.id.toString(),
            name: ontology.name,
            description: ontology.description,
            version: ontology.version
        };
    }
}
exports.GetOntologyQueryHandler = GetOntologyQueryHandler;
//# sourceMappingURL=GetOntologyQueryHandler.js.map