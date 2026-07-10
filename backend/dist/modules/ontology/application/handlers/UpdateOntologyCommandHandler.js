"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOntologyCommandHandler = void 0;
class UpdateOntologyCommandHandler {
    ontologyService;
    constructor(ontologyService) {
        this.ontologyService = ontologyService;
    }
    async handle(command, userId, ipAddress) {
        await this.ontologyService.update(command.id, { name: command.name, description: command.description }, userId, ipAddress);
    }
}
exports.UpdateOntologyCommandHandler = UpdateOntologyCommandHandler;
//# sourceMappingURL=UpdateOntologyCommandHandler.js.map