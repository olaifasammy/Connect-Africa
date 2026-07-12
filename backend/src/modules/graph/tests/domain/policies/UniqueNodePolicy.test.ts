import { UniqueNodePolicy } from '@modules/graph/domain/policies/UniqueNodePolicy';
import { GraphNode } from '@modules/graph/domain/entities/GraphEntities';

describe('UniqueNodePolicy', () => {
  it('should return true for unique node', () => {
    const nodes = [new GraphNode('n1', 'type', [], {})];
    const newNode = new GraphNode('n2', 'type', [], {});
    
    expect(UniqueNodePolicy.check(nodes, newNode)).toBe(true);
  });

  it('should return false for duplicate node', () => {
    const nodes = [new GraphNode('n1', 'type', [], {})];
    const newNode = new GraphNode('n1', 'type', [], {});
    
    expect(UniqueNodePolicy.check(nodes, newNode)).toBe(false);
  });
});
