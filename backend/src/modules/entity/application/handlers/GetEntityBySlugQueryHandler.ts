import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityBySlugQuery } from '@modules/entity/application/queries/GetEntityBySlugQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';

export class GetEntityBySlugQueryHandler implements IQueryHandler<GetEntityBySlugQuery, any> {
  constructor(private readonly entityRepository: IEntityRepository) {}
  async handle(query: GetEntityBySlugQuery): Promise<any> {
    return await this.entityRepository.findBySlug(query.slug);
  }
}
