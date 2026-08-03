import { Entity } from '../entities/Entity';
import { IDuplicateDetectionService } from './IDuplicateDetectionService';
import { IEntityRepository } from '../repositories/IEntityRepository';

export class DuplicateDetectionService implements IDuplicateDetectionService {
  constructor(private readonly entityRepository: IEntityRepository) {}

  async isDuplicate(entity: Entity): Promise<boolean> {
    // Basic duplication detection logic: checking if name already exists
    return await this.entityRepository.existsBySlug(entity.name.value);
  }
}
