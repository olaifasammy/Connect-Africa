"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileId = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
class UserProfileId extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static create(value) {
        return new UserProfileId({ value });
    }
}
exports.UserProfileId = UserProfileId;
//# sourceMappingURL=UserProfileId.js.map