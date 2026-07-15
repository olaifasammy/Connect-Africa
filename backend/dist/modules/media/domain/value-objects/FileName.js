"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileName = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class FileName extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('File name cannot be empty');
        }
        super({ value: value.trim() });
    }
    get value() {
        return this.props.value;
    }
}
exports.FileName = FileName;
//# sourceMappingURL=FileName.js.map