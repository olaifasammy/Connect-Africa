"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReadingProgressCommand = void 0;
class UpdateReadingProgressCommand {
    userId;
    articleId;
    progress;
    ipAddress;
    constructor(userId, articleId, progress, ipAddress) {
        this.userId = userId;
        this.articleId = articleId;
        this.progress = progress;
        this.ipAddress = ipAddress;
    }
}
exports.UpdateReadingProgressCommand = UpdateReadingProgressCommand;
//# sourceMappingURL=UpdateReadingProgressCommand.js.map