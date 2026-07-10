"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaSecret = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class MfaSecret extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
    get value() {
        return this.props.value;
    }
}
exports.MfaSecret = MfaSecret;
//# sourceMappingURL=MfaSecret.js.map