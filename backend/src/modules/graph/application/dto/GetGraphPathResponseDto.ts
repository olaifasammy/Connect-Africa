import { GraphNode } from '@modules/graph/domain/entities/GraphEntities';

export interface GetGraphPathResponseDto {
  path: GraphNode[];
}
