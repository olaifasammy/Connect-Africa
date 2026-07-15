"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MediaUsage_1 = require("../../../../../media/domain/models/MediaUsage");
const UniqueEntityId_1 = require("../../../../../../shared/domain/UniqueEntityId");
describe('MediaUsage', () => {
    it('should create valid media usage', () => {
        const mediaId = new UniqueEntityId_1.UniqueEntityId();
        const resourceId = new UniqueEntityId_1.UniqueEntityId();
        const usage = MediaUsage_1.MediaUsage.create({
            mediaId,
            resourceType: 'Entity',
            resourceId,
            usedAt: new Date()
        });
        expect(usage.mediaId).toBe(mediaId);
        expect(usage.resourceType).toBe('Entity');
        expect(usage.resourceId).toBe(resourceId);
    });
});
//# sourceMappingURL=MediaUsage.spec.js.map