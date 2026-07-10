"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MFADisabledEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MFADisabledEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.MFADisabledEvent = MFADisabledEvent;
//# sourceMappingURL=MFADisabledEvent.js.map