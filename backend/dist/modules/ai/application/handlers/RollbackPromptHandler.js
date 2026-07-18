"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollbackPromptHandler = void 0;
class RollbackPromptHandler {
    promptRepository;
    constructor(promptRepository) {
        this.promptRepository = promptRepository;
    }
    async handle(command) {
        const prompt = await this.promptRepository.findById(command.promptId);
        if (!prompt)
            throw new Error('Prompt not found');
        // In production, implement rollback logic to specific version
        console.log(`[PROMPT] Rolling back ${command.promptId} to version ${command.version}`);
    }
}
exports.RollbackPromptHandler = RollbackPromptHandler;
//# sourceMappingURL=RollbackPromptHandler.js.map