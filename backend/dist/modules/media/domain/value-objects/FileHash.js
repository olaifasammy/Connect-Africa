"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileHash = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class FileHash extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(value, algorithm = 'sha256') {
        if (!value || value.trim().length === 0) {
            throw new Error('FileHash cannot be empty');
        }
        return new FileHash({ value, algorithm });
    }
    get value() {
        return this.props.value;
    }
    get algorithm() {
        return this.props.algorithm;
    }
}
exports.FileHash = FileHash;
//# sourceMappingURL=FileHash.js.map