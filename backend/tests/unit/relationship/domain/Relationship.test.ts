import { Relationship } from '../../../../src/modules/relationship/domain/entities/Relationship';
import { RelationshipId, EntityId, RelationshipTypeId } from '../../../../src/modules/relationship/domain/value-objects/RelationshipValueObjects';

describe('Relationship Entity', () => {
  it('should create a valid relationship', () => {
    const id = new RelationshipId('test-id');
    const source = new EntityId('entity-1');
    const target = new EntityId('entity-2');
    const type = new RelationshipTypeId('related-to');
    
    const relationship = Relationship.create(id, source, target, type);
    
    expect(relationship.id.equals(id)).toBe(true);
    expect(relationship.sourceEntityId.equals(source)).toBe(true);
    expect(relationship.targetEntityId.equals(target)).toBe(true);
    expect(relationship.relationshipTypeId.equals(type)).toBe(true);
    expect(relationship.createdAt).toBeInstanceOf(Date);
  });
});
