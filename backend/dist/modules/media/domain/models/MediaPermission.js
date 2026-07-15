"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPermission = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class MediaPermission extends Entity_1.Entity {
    static create(props, id) {
        return new MediaPermission(props, id);
    }
}
exports.MediaPermission = MediaPermission;
//# sourceMappingURL=MediaPermission.js.map