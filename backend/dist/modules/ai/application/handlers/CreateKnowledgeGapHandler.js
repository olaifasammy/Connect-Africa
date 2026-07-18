"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKnowledgeGapHandler = void 0;
const KnowledgeGap_1 = require("../../domain/entities/KnowledgeGap");
class CreateKnowledgeGapHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        const gap = new KnowledgeGap_1.KnowledgeGap(Math.random().toString(), command.topic, command.prompt, 'OPEN', new Date());
        await this.repository.save(gap);
    }
}
exports.CreateKnowledgeGapHandler = CreateKnowledgeGapHandler;
//# sourceMappingURL=CreateKnowledgeGapHandler.js.map