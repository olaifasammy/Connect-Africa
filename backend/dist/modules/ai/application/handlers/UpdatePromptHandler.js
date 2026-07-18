"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePromptHandler = void 0;
class UpdatePromptHandler {
    promptRepository;
    constructor(promptRepository) {
        this.promptRepository = promptRepository;
    }
    async handle(command) {
        const prompt = await this.promptRepository.findById(command.promptId);
        if (!prompt)
            throw new Error('Prompt not found');
        // In production, implement versioning logic here
        await this.promptRepository.save({ ...prompt, content: command.content });
    }
}
exports.UpdatePromptHandler = UpdatePromptHandler;
//# sourceMappingURL=UpdatePromptHandler.js.map