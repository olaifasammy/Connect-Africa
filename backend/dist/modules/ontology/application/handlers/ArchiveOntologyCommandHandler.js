"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveOntologyCommandHandler = void 0;
class ArchiveOntologyCommandHandler {
    ontologyService;
    constructor(ontologyService) {
        this.ontologyService = ontologyService;
    }
    async handle(command, userId, ipAddress) {
        await this.ontologyService.archive(command.id, userId, ipAddress);
    }
}
exports.ArchiveOntologyCommandHandler = ArchiveOntologyCommandHandler;
//# sourceMappingURL=ArchiveOntologyCommandHandler.js.map