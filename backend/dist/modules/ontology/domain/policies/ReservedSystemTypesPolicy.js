"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservedSystemTypesPolicy = void 0;
const DomainError_1 = require("../errors/DomainError");
class ReservedSystemTypesPolicy {
    RESERVED_TYPES = ['system', 'root', 'base'];
    validate(typeName) {
        if (this.RESERVED_TYPES.includes(typeName.toLowerCase())) {
            throw new DomainError_1.DomainError(`Type name '${typeName}' is a reserved system type.`);
        }
    }
}
exports.ReservedSystemTypesPolicy = ReservedSystemTypesPolicy;
//# sourceMappingURL=ReservedSystemTypesPolicy.js.map