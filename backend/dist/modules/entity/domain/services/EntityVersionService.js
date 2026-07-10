"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityVersionService = void 0;
const EntityVersion_1 = require("../entities/EntityVersion");
const EntityValueObjects_1 = require("../value-objects/EntityValueObjects");
class EntityVersionService {
    entityVersionRepository;
    constructor(entityVersionRepository) {
        this.entityVersionRepository = entityVersionRepository;
    }
    async createVersion(entity) {
        // Basic versioning logic
        const version = EntityVersion_1.EntityVersion.create({
            entityId: entity.entityId,
            versionNumber: new EntityValueObjects_1.VersionNumber(1), // Default to version 1
            metadata: entity.metadata,
            createdAt: new Date()
        });
        await this.entityVersionRepository.save(version);
        return version;
    }
}
exports.EntityVersionService = EntityVersionService;
//# sourceMappingURL=EntityVersionService.js.map