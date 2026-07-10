"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityId = void 0;
const uuid_1 = require("uuid");
class UniqueEntityId {
    value;
    constructor(value) {
        this.value = value || (0, uuid_1.v4)();
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.UniqueEntityId = UniqueEntityId;
//# sourceMappingURL=UniqueEntityId.js.map