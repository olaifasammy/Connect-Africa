import { GraphNode } from '../entities/GraphEntities';
export declare class UniqueNodePolicy {
    static check(nodes: GraphNode[], newNode: GraphNode): boolean;
}
