"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOntologyVersionCommandHandler = void 0;
class CreateOntologyVersionCommandHandler {
    ontologyVersionService;
    constructor(ontologyVersionService) {
        this.ontologyVersionService = ontologyVersionService;
    }
    async handle(command) {
        await this.ontologyVersionService.createVersion(command.ontologyId, command.version);
    }
}
exports.CreateOntologyVersionCommandHandler = CreateOntologyVersionCommandHandler;
//# sourceMappingURL=CreateOntologyVersionCommandHandler.js.map