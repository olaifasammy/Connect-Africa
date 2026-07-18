"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostRecord = void 0;
class CostRecord {
    id;
    providerId;
    amount;
    currency;
    timestamp;
    constructor(id, providerId, amount, currency, timestamp) {
        this.id = id;
        this.providerId = providerId;
        this.amount = amount;
        this.currency = currency;
        this.timestamp = timestamp;
    }
}
exports.CostRecord = CostRecord;
//# sourceMappingURL=CostRecord.js.map