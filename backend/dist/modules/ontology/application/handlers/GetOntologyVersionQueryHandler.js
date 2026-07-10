"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOntologyVersionQueryHandler = void 0;
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class GetOntologyVersionQueryHandler {
    ontologyVersionRepository;
    constructor(ontologyVersionRepository) {
        this.ontologyVersionRepository = ontologyVersionRepository;
    }
    async handle(query) {
        const version = await this.ontologyVersionRepository.findById(new UniqueEntityId_1.UniqueEntityId(query.id));
        if (!version) {
            throw new Error('Ontology Version not found');
        }
        return {
            id: version.id.toString(),
            version: version.version,
            isPublished: version.isPublished
        };
    }
}
exports.GetOntologyVersionQueryHandler = GetOntologyVersionQueryHandler;
//# sourceMappingURL=GetOntologyVersionQueryHandler.js.map