import { Entity } from '../entities/Entity';
export interface IEntityMergeService {
    merge(sourceEntityId: string, targetEntityId: string): Promise<Entity>;
}
