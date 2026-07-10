"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryCode = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class RecoveryCode extends ValueObject_1.ValueObject {
    constructor(hash) {
        super({ hash });
    }
    get hash() {
        return this.props.hash;
    }
}
exports.RecoveryCode = RecoveryCode;
//# sourceMappingURL=RecoveryCode.js.map