export interface CreateGraphNodeDto {
  entityId: string;
  type: string;
  metadata: Record<string, any>;
}

export interface UpdateGraphNodeDto {
  metadata: Record<string, any>;
}

export interface CreateGraphEdgeDto {
  sourceEntityId: string;
  targetEntityId: string;
  relationshipType: string;
  properties: Record<string, any>;
}

export interface GraphNodeResponseDto {
  entityId: string;
  type: string;
  labels: string[];
  metadata: Record<string, any>;
}

export interface GraphEdgeResponseDto {
  sourceEntityId: string;
  targetEntityId: string;
  relationshipType: string;
  properties: Record<string, any>;
}
