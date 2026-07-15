"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaId = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class MediaId extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
}
exports.MediaId = MediaId;
//# sourceMappingURL=MediaId.js.map