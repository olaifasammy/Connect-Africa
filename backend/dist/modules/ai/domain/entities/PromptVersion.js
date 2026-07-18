"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptVersion = void 0;
class PromptVersion {
    id;
    promptId;
    content;
    version;
    createdAt;
    constructor(id, promptId, content, version, createdAt) {
        this.id = id;
        this.promptId = promptId;
        this.content = content;
        this.version = version;
        this.createdAt = createdAt;
    }
}
exports.PromptVersion = PromptVersion;
//# sourceMappingURL=PromptVersion.js.map