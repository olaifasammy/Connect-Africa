"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timestamp = exports.UserAgent = exports.IPAddress = exports.CorrelationId = exports.ResourceId = exports.UserId = exports.AuditId = void 0;
const ValueObject_1 = require("../../../../shared/domain/ValueObject");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class AuditId extends UniqueEntityId_1.UniqueEntityId {
}
exports.AuditId = AuditId;
class UserId extends UniqueEntityId_1.UniqueEntityId {
}
exports.UserId = UserId;
class ResourceId extends UniqueEntityId_1.UniqueEntityId {
}
exports.ResourceId = ResourceId;
class CorrelationId extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value)
            throw new Error('CorrelationId cannot be empty');
        super({ value });
    }
}
exports.CorrelationId = CorrelationId;
class IPAddress extends ValueObject_1.ValueObject {
    constructor(value) {
        // Basic IP validation
        if (!/^(?:\d{1,3}\.){3}\d{1,3}$/.test(value))
            throw new Error('Invalid IP address');
        super({ value });
    }
}
exports.IPAddress = IPAddress;
class UserAgent extends ValueObject_1.ValueObject {
    constructor(value) {
        if (!value)
            throw new Error('UserAgent cannot be empty');
        super({ value });
    }
}
exports.UserAgent = UserAgent;
class Timestamp extends ValueObject_1.ValueObject {
    constructor(value) {
        super({ value });
    }
}
exports.Timestamp = Timestamp;
//# sourceMappingURL=AuditValueObjects.js.map