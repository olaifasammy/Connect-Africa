"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class UserId extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static create(value) {
        return new UserId({ value });
    }
}
exports.UserId = UserId;
//# sourceMappingURL=UserId.js.map