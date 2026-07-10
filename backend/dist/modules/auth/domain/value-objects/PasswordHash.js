"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHash = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class PasswordHash extends ValueObject_1.ValueObject {
    constructor(hash) {
        super({ value: hash });
    }
    get value() {
        return this.props.value;
    }
}
exports.PasswordHash = PasswordHash;
//# sourceMappingURL=PasswordHash.js.map