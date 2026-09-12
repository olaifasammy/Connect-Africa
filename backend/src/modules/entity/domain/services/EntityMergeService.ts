import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IUnitOfWork } from '@shared/infrastructure/database/IUnitOfWork';

import { IEntityMergeService } from './IEntityMergeService';
import { IEntityRepository } from '../repositories/IEntityRepository';
import { EntityId } from '../value-objects/EntityId';

@provide(EntityMergeService, true)
@injectable()
export class EntityMergeService implements IEntityMergeService {
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('IUnitOfWork')
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async merge(
    sourceEntityId: string,
    targetEntityId: string,
  ) {
    const sourceId = EntityId.create(sourceEntityId);
    const targetId = EntityId.create(targetEntityId);

    if (sourceId.value === targetId.value) {
      throw new Error(
        'An entity cannot be merged with itself.',
      );
    }

    return this.unitOfWork.execute(async () => {
      const [sourceEntity, targetEntity] = await Promise.all([
        this.entityRepository.findById(sourceId),
        this.entityRepository.findById(targetId),
      ]);

      if (!sourceEntity) {
        throw new Error(
          `Source entity with ID ${sourceId.value} not found.`,
        );
      }

      if (!targetEntity) {
        throw new Error(
          `Target entity with ID ${targetId.value} not found.`,
        );
      }

      if (sourceEntity.status === 'ARCHIVED') {
        throw new Error(
          'Archived entities cannot be merged.',
        );
      }

      if (targetEntity.status === 'ARCHIVED') {
        throw new Error(
          'Archived entities cannot receive a merge.',
        );
      }

      targetEntity.merge(sourceEntity);
      sourceEntity.archive();

      await this.entityRepository.save(targetEntity);
      await this.entityRepository.save(sourceEntity);

      return targetEntity;
    });
  }
}