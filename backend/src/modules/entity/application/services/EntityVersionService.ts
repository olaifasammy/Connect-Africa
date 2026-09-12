import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { IEntityVersionRepository } from '@modules/entity/domain/repositories/IEntityVersionRepository';
import { EntityVersion } from '@modules/entity/domain/entities/EntityVersion';

@provide(EntityVersionService, true)
@injectable()
export class EntityVersionService {
  constructor(
    @inject('IEntityVersionRepository')
    private readonly versionRepository: IEntityVersionRepository,
  ) {}

  async findById(id: string): Promise<EntityVersion | null> {
    return this.versionRepository.findById(id);
  }
}