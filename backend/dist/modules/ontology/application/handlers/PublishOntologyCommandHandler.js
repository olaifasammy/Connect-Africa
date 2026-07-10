"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishOntologyCommandHandler = void 0;
class PublishOntologyCommandHandler {
    ontologyService;
    constructor(ontologyService) {
        this.ontologyService = ontologyService;
    }
    async handle(command, userId, ipAddress) {
        await this.ontologyService.publish(command.id, userId, ipAddress);
    }
}
exports.PublishOntologyCommandHandler = PublishOntologyCommandHandler;
//# sourceMappingURL=PublishOntologyCommandHandler.js.map