"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueOntologyPolicy = void 0;
const DomainError_1 = require("../errors/DomainError");
class UniqueOntologyPolicy {
    ontologyRepository;
    constructor(ontologyRepository) {
        this.ontologyRepository = ontologyRepository;
    }
    async validate(name) {
        const exists = await this.ontologyRepository.exists(name);
        if (exists) {
            throw new DomainError_1.DomainError(`Ontology with name '${name}' already exists.`);
        }
    }
}
exports.UniqueOntologyPolicy = UniqueOntologyPolicy;
//# sourceMappingURL=UniqueOntologyPolicy.js.map