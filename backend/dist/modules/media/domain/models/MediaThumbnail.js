"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaThumbnail = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class MediaThumbnail extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new MediaThumbnail(props, id);
    }
    get filePath() {
        return this.props.filePath;
    }
    get dimensions() {
        return this.props.dimensions;
    }
}
exports.MediaThumbnail = MediaThumbnail;
//# sourceMappingURL=MediaThumbnail.js.map