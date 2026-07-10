import { Entity } from '../entities/Entity';

export interface IDuplicateDetectionService {
  isDuplicate(entity: Entity): Promise<boolean>;
}
