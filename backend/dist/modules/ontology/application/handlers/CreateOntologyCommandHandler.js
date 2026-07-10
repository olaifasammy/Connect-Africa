"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOntologyCommandHandler = void 0;
class CreateOntologyCommandHandler {
    ontologyService;
    constructor(ontologyService) {
        this.ontologyService = ontologyService;
    }
    async handle(command, userId, ipAddress) {
        const ontology = await this.ontologyService.create({ name: command.name, description: command.description }, userId, ipAddress);
        return {
            id: ontology.id.toString(),
            name: ontology.name,
            description: command.description,
            version: 1, // Defaulting or removing if not needed in response
        };
    }
}
exports.CreateOntologyCommandHandler = CreateOntologyCommandHandler;
//# sourceMappingURL=CreateOntologyCommandHandler.js.map