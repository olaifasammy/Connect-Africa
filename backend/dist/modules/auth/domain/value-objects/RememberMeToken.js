"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RememberMeToken = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RememberMeToken extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static create(userId, expiresAt) {
        return new RememberMeToken({
            value: new UniqueEntityId_1.UniqueEntityId().toString(),
            userId,
            expiresAt,
        });
    }
}
exports.RememberMeToken = RememberMeToken;
//# sourceMappingURL=RememberMeToken.js.map