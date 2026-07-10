"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntityCommand = void 0;
class UpdateEntityCommand {
    entityId;
    dto;
    userId;
    constructor(entityId, dto, userId) {
        this.entityId = entityId;
        this.dto = dto;
        this.userId = userId;
    }
}
exports.UpdateEntityCommand = UpdateEntityCommand;
//# sourceMappingURL=UpdateEntityCommand.js.map