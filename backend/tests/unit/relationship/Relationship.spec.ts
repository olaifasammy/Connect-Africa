import { Relationship } from '../../../src/modules/relationship/domain/entities/Relationship';
import { RelationshipId, EntityId, RelationshipTypeId } from '../../../src/modules/relationship/domain/value-objects/RelationshipValueObjects';

describe('Relationship Entity', () => {
  it('should create a valid relationship', () => {
    const id = new RelationshipId();
    const sourceId = new EntityId('source-1');
    const targetId = new EntityId('target-1');
    const typeId = new RelationshipTypeId('type-1');

    const relationship = Relationship.create(id, sourceId, targetId, typeId);

    expect(relationship.sourceEntityId.equals(sourceId)).toBe(true);
    expect(relationship.targetEntityId.equals(targetId)).toBe(true);
  });

  it('should throw error when source and target are the same', () => {
    const id = new RelationshipId();
    const sameId = new EntityId('same');
    const typeId = new RelationshipTypeId('type-1');

    expect(() => {
      Relationship.create(id, sameId, sameId, typeId);
    }).toThrow('Business Rule Violation: Source and target entity cannot be the same.');
  });
});
