"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilePath = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class FilePath extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(path) {
        if (!path || path.trim().length === 0) {
            throw new Error('FilePath cannot be empty');
        }
        return new FilePath({ value: path });
    }
    get value() {
        return this.props.value;
    }
}
exports.FilePath = FilePath;
//# sourceMappingURL=FilePath.js.map