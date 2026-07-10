"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateDetectionService = void 0;
/**
 * Service responsible for detecting duplicate relationship instances.
 */
class DuplicateDetectionService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async exists(relationship) {
        // Logic to check repository for existing relationship with same source, target, type
        return await this.repository.exists(relationship);
    }
}
exports.DuplicateDetectionService = DuplicateDetectionService;
//# sourceMappingURL=DuplicateDetectionService.js.map