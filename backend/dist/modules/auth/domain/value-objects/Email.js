"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const UserErrors_1 = require("../errors/UserErrors");
class Email extends ValueObject_1.ValueObject {
    constructor(email) {
        if (!email.includes('@')) {
            throw new UserErrors_1.InvalidEmailError(email);
        }
        super({ value: email.toLowerCase() });
    }
    get value() {
        return this.props.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map