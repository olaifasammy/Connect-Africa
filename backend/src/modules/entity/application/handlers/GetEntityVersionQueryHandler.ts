import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityVersionQuery } from '@modules/entity/application/queries/GetEntityVersionQuery';
import { IEntityVersionRepository } from '@modules/entity/domain/repositories/IEntityVersionRepository';

export class GetEntityVersionQueryHandler implements IQueryHandler<GetEntityVersionQuery, any> {
  constructor(private readonly entityVersionRepository: IEntityVersionRepository) {}
  async handle(query: GetEntityVersionQuery): Promise<any> {
    return await this.entityVersionRepository.findById(query.versionId);
  }
}
