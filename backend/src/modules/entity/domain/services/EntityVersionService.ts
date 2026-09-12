import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IUnitOfWork } from '@shared/infrastructure/database/IUnitOfWork';

import { Entity } from '../entities/Entity';
import { EntityVersion } from '../entities/EntityVersion';
import { IEntityVersionService } from './IEntityVersionService';
import { IEntityVersionRepository } from '../repositories/IEntityVersionRepository';
import {
  EntityStatus,
  VersionNumber,
} from '../value-objects/EntityValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@provide(EntityVersionService, true)
@injectable()
export class EntityVersionService implements IEntityVersionService {
  constructor(
    @inject('IEntityVersionRepository')
    private readonly entityVersionRepository: IEntityVersionRepository,

    @inject('IUnitOfWork')
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async createVersion(entity: Entity): Promise<EntityVersion> {
    return this.unitOfWork.execute(async () => {
      const nextVersionNumber =
        await this.entityVersionRepository.getNextVersionNumber(
          entity.entityId,
        );

      const version = EntityVersion.create(
        {
          entityId: entity.entityId,
          versionNumber: VersionNumber.create(nextVersionNumber),
          name: entity.name.value,
          type: entity.type,
          metadata: entity.metadata,
          status: EntityStatus.create(entity.status),
          createdAt: new Date(),
        },
        new UniqueEntityId(),
      );

      await this.entityVersionRepository.save(version);

      return version;
    });
  }
}