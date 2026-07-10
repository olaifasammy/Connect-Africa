import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IAnalyticsRepository {
    findById(id: UniqueEntityId): Promise<any | null>;
    save(entity: any): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
}
