"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaFolder = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
class MediaFolder extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new MediaFolder(props, id);
    }
    get name() {
        return this.props.name;
    }
}
exports.MediaFolder = MediaFolder;
//# sourceMappingURL=MediaFolder.js.map