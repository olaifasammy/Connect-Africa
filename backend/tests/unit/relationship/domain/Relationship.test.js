"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Relationship_1 = require("../../../../src/modules/relationship/domain/entities/Relationship");
const RelationshipValueObjects_1 = require("../../../../src/modules/relationship/domain/value-objects/RelationshipValueObjects");
describe('Relationship Entity', () => {
    it('should create a valid relationship', () => {
        const id = new RelationshipValueObjects_1.RelationshipId('test-id');
        const source = new RelationshipValueObjects_1.EntityId('entity-1');
        const target = new RelationshipValueObjects_1.EntityId('entity-2');
        const type = new RelationshipValueObjects_1.RelationshipTypeId('related-to');
        const relationship = Relationship_1.Relationship.create(id, source, target, type);
        expect(relationship.id.equals(id)).toBe(true);
        expect(relationship.sourceEntityId.equals(source)).toBe(true);
        expect(relationship.targetEntityId.equals(target)).toBe(true);
        expect(relationship.relationshipTypeId.equals(type)).toBe(true);
        expect(relationship.createdAt).toBeInstanceOf(Date);
    });
});
//# sourceMappingURL=Relationship.test.js.map