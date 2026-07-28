import { GraphNode } from '../entities/GraphEntities';

export class UniqueNodePolicy {
  public static check(nodes: GraphNode[], newNode: GraphNode): boolean {
    return !nodes.some(n => n.entityId === newNode.entityId);
  }
}
