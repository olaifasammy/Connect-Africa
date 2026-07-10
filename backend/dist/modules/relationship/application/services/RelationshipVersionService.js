"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipVersionService = void 0;
const RelationshipVersion_1 = require("../../domain/entities/RelationshipVersion");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
/**
 * Application service managing relationship versioning.
 */
class RelationshipVersionService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async createVersion(relationship, data) {
        const version = new RelationshipVersion_1.RelationshipVersion({
            relationshipId: relationship.id, // Simple cast for implementation
            versionNumber: new RelationshipValueObjects_1.VersionNumber(1), // Logic to increment version
            data: new RelationshipValueObjects_1.Metadata(data),
            createdAt: new Date(),
        });
        await this.repository.save(version);
    }
}
exports.RelationshipVersionService = RelationshipVersionService;
//# sourceMappingURL=RelationshipVersionService.js.map