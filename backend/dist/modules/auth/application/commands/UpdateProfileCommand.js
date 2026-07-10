"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileCommand = void 0;
class UpdateProfileCommand {
    userId;
    displayName;
    bio;
    avatarUrl;
    ipAddress;
    constructor(userId, displayName, bio, avatarUrl, ipAddress) {
        this.userId = userId;
        this.displayName = displayName;
        this.bio = bio;
        this.avatarUrl = avatarUrl;
        this.ipAddress = ipAddress;
    }
}
exports.UpdateProfileCommand = UpdateProfileCommand;
//# sourceMappingURL=UpdateProfileCommand.js.map