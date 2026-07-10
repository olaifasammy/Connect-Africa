"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToReadingHistoryCommand = void 0;
class AddToReadingHistoryCommand {
    userId;
    articleId;
    ipAddress;
    constructor(userId, articleId, ipAddress) {
        this.userId = userId;
        this.articleId = articleId;
        this.ipAddress = ipAddress;
    }
}
exports.AddToReadingHistoryCommand = AddToReadingHistoryCommand;
//# sourceMappingURL=AddToReadingHistoryCommand.js.map