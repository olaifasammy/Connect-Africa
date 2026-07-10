import { IEntityVersionRepository } from '@modules/entity/domain/repositories/IEntityVersionRepository';
import { EntityVersion } from '@modules/entity/domain/entities/EntityVersion';

export class EntityVersionService {
  constructor(private readonly versionRepository: IEntityVersionRepository) {}

  async findById(id: string): Promise<EntityVersion | null> {
    return await this.versionRepository.findById(id);
  }
}
