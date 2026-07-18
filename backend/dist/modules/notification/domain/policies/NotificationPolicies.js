"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitPolicy = exports.NotificationPolicy = exports.UserPreferencePolicy = exports.RetryPolicy = exports.DeliveryPolicy = void 0;
const NotificationValueObjects_1 = require("../value-objects/NotificationValueObjects");
class DeliveryPolicy {
    isEligible(notification) {
        return notification.status === NotificationValueObjects_1.DeliveryStatus.PENDING;
    }
}
exports.DeliveryPolicy = DeliveryPolicy;
class RetryPolicy {
    shouldRetry(attempts) {
        return attempts < 3;
    }
}
exports.RetryPolicy = RetryPolicy;
class UserPreferencePolicy {
    isChannelEnabled(preference) {
        return preference.enabled;
    }
}
exports.UserPreferencePolicy = UserPreferencePolicy;
class NotificationPolicy {
    canSend(notification) {
        return true; // Simplified for skeleton
    }
}
exports.NotificationPolicy = NotificationPolicy;
class RateLimitPolicy {
    isRateLimited(recipientId) {
        return false; // Simplified for skeleton
    }
}
exports.RateLimitPolicy = RateLimitPolicy;
//# sourceMappingURL=NotificationPolicies.js.map