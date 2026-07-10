"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOntologiesQueryHandler = void 0;
class ListOntologiesQueryHandler {
    ontologyRepository;
    constructor(ontologyRepository) {
        this.ontologyRepository = ontologyRepository;
    }
    async handle(query) {
        const limit = query.limit || 10;
        const offset = query.offset || 0;
        const ontologies = await this.ontologyRepository.findAll(limit, offset);
        return ontologies.map(ontology => ({
            id: ontology.id.toString(),
            name: ontology.name,
            description: ontology.description,
            version: ontology.version
        }));
    }
}
exports.ListOntologiesQueryHandler = ListOntologiesQueryHandler;
//# sourceMappingURL=ListOntologiesQueryHandler.js.map