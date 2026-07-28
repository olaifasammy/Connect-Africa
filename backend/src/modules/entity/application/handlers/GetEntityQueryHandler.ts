import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityQuery } from '@modules/entity/application/queries/GetEntityQuery';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';

export class GetEntityQueryHandler implements IQueryHandler<GetEntityQuery, any> {
  constructor(private readonly entityRepository: IEntityRepository) {}

  async handle(query: GetEntityQuery): Promise<any> {
    const entity = await this.entityRepository.findById(EntityId.create(query.entityId));
    if (!entity) throw new Error('Entity not found');
    return entity; // Should be mapped to a DTO
  }
}
