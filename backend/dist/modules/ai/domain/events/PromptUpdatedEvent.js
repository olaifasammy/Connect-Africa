"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptUpdatedEvent = void 0;
class PromptUpdatedEvent {
    promptId;
    version;
    timestamp;
    constructor(promptId, version, timestamp) {
        this.promptId = promptId;
        this.version = version;
        this.timestamp = timestamp;
    }
}
exports.PromptUpdatedEvent = PromptUpdatedEvent;
//# sourceMappingURL=PromptUpdatedEvent.js.map