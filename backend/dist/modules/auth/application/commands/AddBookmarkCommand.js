"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBookmarkCommand = void 0;
class AddBookmarkCommand {
    userId;
    articleId;
    ipAddress;
    constructor(userId, articleId, ipAddress) {
        this.userId = userId;
        this.articleId = articleId;
        this.ipAddress = ipAddress;
    }
}
exports.AddBookmarkCommand = AddBookmarkCommand;
//# sourceMappingURL=AddBookmarkCommand.js.map