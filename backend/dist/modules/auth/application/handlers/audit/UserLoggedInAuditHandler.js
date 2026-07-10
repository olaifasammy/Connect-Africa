"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoggedInAuditHandler = void 0;
const AuditLogger_1 = require("../../../../../shared/infrastructure/logging/AuditLogger");
class UserLoggedInAuditHandler {
    async handle(event) {
        AuditLogger_1.AuditLogger.log({
            user: event.userId.toString(),
            action: 'LOGIN',
            resource: 'AUTH',
            status: 'SUCCESS',
        });
    }
}
exports.UserLoggedInAuditHandler = UserLoggedInAuditHandler;
//# sourceMappingURL=UserLoggedInAuditHandler.js.map