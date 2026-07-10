import { Entity } from '../entities/Entity';
import { IEntityRepository } from '../repositories/IEntityRepository';
import { IEntityPolicy } from './IEntityPolicy';

/**
 * Policy to validate unique entity slugs.
 */
export class UniqueSlugPolicy implements IEntityPolicy {
  constructor(private readonly repository: IEntityRepository) {}

  async validate(entity: Entity): Promise<void> {
    const slug = entity.metadata.slug;
    if (!slug) {
        throw new Error('Business Rule Violation: Entity slug is required for uniqueness validation.');
    }
    const exists = await this.repository.existsBySlug(slug);
    if (exists) {
      throw new Error('Business Rule Violation: Entity slug must be unique.');
    }
  }
}
