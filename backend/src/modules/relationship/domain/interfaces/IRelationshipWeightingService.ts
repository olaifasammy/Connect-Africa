export interface IRelationshipWeightingService {
  calculateWeight(relationshipId: string, context: Record<string, any>): Promise<number>;
}
