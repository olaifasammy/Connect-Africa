"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPreferences = void 0;
const AggregateRoot_1 = require("../../../../shared/domain/AggregateRoot");
class UserPreferences extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        return new UserPreferences(props, id);
    }
    get userId() {
        return this.props.userId;
    }
    get receiveEmailNotifications() {
        return this.props.receiveEmailNotifications;
    }
    get receivePushNotifications() {
        return this.props.receivePushNotifications;
    }
    updateNotifications(email, push) {
        this.props.receiveEmailNotifications = email;
        this.props.receivePushNotifications = push;
    }
}
exports.UserPreferences = UserPreferences;
//# sourceMappingURL=UserPreferences.js.map