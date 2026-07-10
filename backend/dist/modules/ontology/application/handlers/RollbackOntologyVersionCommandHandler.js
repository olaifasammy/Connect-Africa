"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollbackOntologyVersionCommandHandler = void 0;
class RollbackOntologyVersionCommandHandler {
    ontologyVersionService;
    constructor(ontologyVersionService) {
        this.ontologyVersionService = ontologyVersionService;
    }
    async handle(command) {
        await this.ontologyVersionService.rollbackVersion(command.id);
    }
}
exports.RollbackOntologyVersionCommandHandler = RollbackOntologyVersionCommandHandler;
//# sourceMappingURL=RollbackOntologyVersionCommandHandler.js.map