"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateMediaPolicy = void 0;
class DuplicateMediaPolicy {
    static isDuplicate(newHash, existingHashes) {
        return existingHashes.some(hash => hash.value === newHash.value);
    }
}
exports.DuplicateMediaPolicy = DuplicateMediaPolicy;
//# sourceMappingURL=DuplicateMediaPolicy.js.map