"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlTargetValidator = void 0;
class CrawlTargetValidator {
    validate(target) {
        return target.url.startsWith('http');
    }
}
exports.CrawlTargetValidator = CrawlTargetValidator;
//# sourceMappingURL=CrawlTargetValidator.js.map