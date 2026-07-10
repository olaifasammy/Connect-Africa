"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionPublishingPolicy = void 0;
const DomainError_1 = require("../errors/DomainError");
class VersionPublishingPolicy {
    validate(version) {
        if (version.isPublished) {
            throw new DomainError_1.DomainError('Cannot modify a published ontology version.');
        }
    }
}
exports.VersionPublishingPolicy = VersionPublishingPolicy;
//# sourceMappingURL=VersionPublishingPolicy.js.map