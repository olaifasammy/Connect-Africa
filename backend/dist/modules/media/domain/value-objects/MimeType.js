"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MimeType = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class MimeType extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value || value.trim() === '') {
            throw new Error('Mime type cannot be empty');
        }
        super({ value: value.trim().toLowerCase() });
    }
    get value() {
        return this.props.value;
    }
}
exports.MimeType = MimeType;
//# sourceMappingURL=MimeType.js.map