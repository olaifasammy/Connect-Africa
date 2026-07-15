"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaTag = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class MediaTag extends Entity_1.Entity {
    static create(props, id) {
        return new MediaTag(props, id);
    }
}
exports.MediaTag = MediaTag;
//# sourceMappingURL=MediaTag.js.map