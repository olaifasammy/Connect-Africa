"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlTarget = exports.ConfidenceScore = exports.Temperature = exports.ModelName = exports.Cost = exports.TokenCount = exports.ProviderId = exports.PromptId = void 0;
class PromptId {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.PromptId = PromptId;
class ProviderId {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.ProviderId = ProviderId;
class TokenCount {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.TokenCount = TokenCount;
class Cost {
    value;
    currency;
    constructor(value, currency) {
        this.value = value;
        this.currency = currency;
    }
}
exports.Cost = Cost;
class ModelName {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.ModelName = ModelName;
class Temperature {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.Temperature = Temperature;
class ConfidenceScore {
    value;
    constructor(value) {
        this.value = value;
    }
}
exports.ConfidenceScore = ConfidenceScore;
class CrawlTarget {
    url;
    constructor(url) {
        this.url = url;
    }
}
exports.CrawlTarget = CrawlTarget;
//# sourceMappingURL=ValueObjects.js.map