"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
const UserCreatedEvent_1 = require("../events/UserCreatedEvent");
class User extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
        if (!id) {
            this.addDomainEvent(new UserCreatedEvent_1.UserCreatedEvent(this.id, this.props.email.value));
        }
    }
    get email() {
        return this.props.email;
    }
    get passwordHash() {
        return this.props.passwordHash;
    }
    get isActive() {
        return this.props.isActive;
    }
    activate() {
        this.props.isActive = true;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map