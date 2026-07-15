"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaCollection = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
class MediaCollection extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new MediaCollection(props, id);
    }
    get name() {
        return this.props.name;
    }
}
exports.MediaCollection = MediaCollection;
//# sourceMappingURL=MediaCollection.js.map