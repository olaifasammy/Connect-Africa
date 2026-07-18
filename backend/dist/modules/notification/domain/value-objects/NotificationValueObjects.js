"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelType = exports.DeliveryStatus = exports.TemplateId = exports.RecipientId = exports.NotificationId = void 0;
class NotificationId {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.NotificationId = NotificationId;
class RecipientId {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.RecipientId = RecipientId;
class TemplateId {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.TemplateId = TemplateId;
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus["PENDING"] = "PENDING";
    DeliveryStatus["SENT"] = "SENT";
    DeliveryStatus["DELIVERED"] = "DELIVERED";
    DeliveryStatus["FAILED"] = "FAILED";
})(DeliveryStatus || (exports.DeliveryStatus = DeliveryStatus = {}));
var ChannelType;
(function (ChannelType) {
    ChannelType["IN_APP"] = "IN_APP";
    ChannelType["EMAIL"] = "EMAIL";
    ChannelType["PUSH"] = "PUSH";
})(ChannelType || (exports.ChannelType = ChannelType = {}));
//# sourceMappingURL=NotificationValueObjects.js.map