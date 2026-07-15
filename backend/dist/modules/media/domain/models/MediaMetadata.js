"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaMetadata = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class MediaMetadata extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new MediaMetadata(props, id);
    }
    get key() {
        return this.props.key;
    }
    get value() {
        return this.props.value;
    }
}
exports.MediaMetadata = MediaMetadata;
//# sourceMappingURL=MediaMetadata.js.map