"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaUsage = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class MediaUsage extends Entity_1.Entity {
    static create(props, id) {
        return new MediaUsage(props, id);
    }
    get mediaId() {
        return this.props.mediaId;
    }
    get resourceType() {
        return this.props.resourceType;
    }
    get resourceId() {
        return this.props.resourceId;
    }
    get usedAt() {
        return this.props.usedAt;
    }
}
exports.MediaUsage = MediaUsage;
//# sourceMappingURL=MediaUsage.js.map