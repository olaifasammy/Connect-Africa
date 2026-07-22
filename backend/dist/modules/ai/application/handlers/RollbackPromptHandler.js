"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollbackPromptHandler = void 0;
const Logger_1 = require("../../../../shared/logger/Logger");
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
        Logger_1.logger.info(`[PROMPT] Rolling back ${command.promptId} to version ${command.version}`);
    }
}
exports.RollbackPromptHandler = RollbackPromptHandler;
//# sourceMappingURL=RollbackPromptHandler.js.map