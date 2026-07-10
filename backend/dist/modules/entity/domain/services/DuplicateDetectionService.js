"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateDetectionService = void 0;
class DuplicateDetectionService {
    entityRepository;
    constructor(entityRepository) {
        this.entityRepository = entityRepository;
    }
    async isDuplicate(entity) {
        // Basic duplication detection logic: checking if name already exists
        return await this.entityRepository.existsBySlug(entity.name.value);
    }
}
exports.DuplicateDetectionService = DuplicateDetectionService;
//# sourceMappingURL=DuplicateDetectionService.js.map