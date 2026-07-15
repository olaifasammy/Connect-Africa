"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSize = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class FileSize extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(bytes) {
        if (bytes < 0) {
            throw new Error('FileSize cannot be negative');
        }
        return new FileSize({ bytes });
    }
    get bytes() {
        return this.props.bytes;
    }
}
exports.FileSize = FileSize;
//# sourceMappingURL=FileSize.js.map