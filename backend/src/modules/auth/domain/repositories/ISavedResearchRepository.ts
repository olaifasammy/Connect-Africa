import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface ISavedResearchRepository {
  saveResearch(userId: UniqueEntityId, researchData: any): Promise<void>;
  getSavedResearch(userId: UniqueEntityId): Promise<any[]>;
}
