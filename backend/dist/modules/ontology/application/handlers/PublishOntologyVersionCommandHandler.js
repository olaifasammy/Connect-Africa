"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishOntologyVersionCommandHandler = void 0;
class PublishOntologyVersionCommandHandler {
    ontologyVersionService;
    constructor(ontologyVersionService) {
        this.ontologyVersionService = ontologyVersionService;
    }
    async handle(command) {
        await this.ontologyVersionService.publishVersion(command.id);
    }
}
exports.PublishOntologyVersionCommandHandler = PublishOntologyVersionCommandHandler;
//# sourceMappingURL=PublishOntologyVersionCommandHandler.js.map