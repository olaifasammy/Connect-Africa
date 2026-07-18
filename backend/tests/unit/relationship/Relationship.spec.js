"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Relationship_1 = require("../../../src/modules/relationship/domain/entities/Relationship");
const RelationshipValueObjects_1 = require("../../../src/modules/relationship/domain/value-objects/RelationshipValueObjects");
describe('Relationship Entity', () => {
    it('should create a valid relationship', () => {
        const id = new RelationshipValueObjects_1.RelationshipId();
        const sourceId = new RelationshipValueObjects_1.EntityId('source-1');
        const targetId = new RelationshipValueObjects_1.EntityId('target-1');
        const typeId = new RelationshipValueObjects_1.RelationshipTypeId('type-1');
        const relationship = Relationship_1.Relationship.create(id, sourceId, targetId, typeId);
        expect(relationship.sourceEntityId.equals(sourceId)).toBe(true);
        expect(relationship.targetEntityId.equals(targetId)).toBe(true);
    });
    it('should throw error when source and target are the same', () => {
        const id = new RelationshipValueObjects_1.RelationshipId();
        const sameId = new RelationshipValueObjects_1.EntityId('same');
        const typeId = new RelationshipValueObjects_1.RelationshipTypeId('type-1');
        expect(() => {
            Relationship_1.Relationship.create(id, sameId, sameId, typeId);
        }).toThrow('Business Rule Violation: Source and target entity cannot be the same.');
    });
});
//# sourceMappingURL=Relationship.spec.js.map