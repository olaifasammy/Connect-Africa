import { Entity } from '../entities/Entity';
import { IEntityValidationService } from './IEntityValidationService';
import { IEntityPolicy } from '../policies/IEntityPolicy';
import { EntityNameUniquenessPolicy } from '../policies/EntityNameUniquenessPolicy';
import { EntityTypeValidationPolicy } from '../policies/EntityTypeValidationPolicy';
import { UniqueSlugPolicy } from '../policies/UniqueSlugPolicy';
import { IEntityRepository } from '../repositories/IEntityRepository';

export class EntityValidationService implements IEntityValidationService {
  private readonly policies: IEntityPolicy[];

  constructor(private readonly entityRepository: IEntityRepository) {
    this.policies = [
      new EntityNameUniquenessPolicy(this.entityRepository),
      new EntityTypeValidationPolicy(),
      new UniqueSlugPolicy(this.entityRepository),
    ];
  }

  async validate(entity: Entity): Promise<void> {
    for (const policy of this.policies) {
      await policy.validate(entity);
    }
  }
}
