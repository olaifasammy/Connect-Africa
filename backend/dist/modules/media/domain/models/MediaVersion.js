"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaVersion = void 0;
const Entity_1 = require("../../../../shared/domain/Entity");
class MediaVersion extends Entity_1.Entity {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new MediaVersion(props, id);
    }
    get version() {
        return this.props.version;
    }
    get filePath() {
        return this.props.filePath;
    }
    get fileHash() {
        return this.props.fileHash;
    }
}
exports.MediaVersion = MediaVersion;
//# sourceMappingURL=MediaVersion.js.map