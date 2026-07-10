"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityVersionService = void 0;
class EntityVersionService {
    versionRepository;
    constructor(versionRepository) {
        this.versionRepository = versionRepository;
    }
    async findById(id) {
        return await this.versionRepository.findById(id);
    }
}
exports.EntityVersionService = EntityVersionService;
//# sourceMappingURL=EntityVersionService.js.map