import { IQueryHandler } from '@shared/application/handlers/IQueryHandler';
import { GetEntityByIdentifierQuery } from '@modules/entity/application/queries/GetEntityByIdentifierQuery';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';

export class GetEntityByIdentifierQueryHandler implements IQueryHandler<GetEntityByIdentifierQuery, any> {
  constructor(private readonly entityRepository: IEntityRepository) {}
  async handle(query: GetEntityByIdentifierQuery): Promise<any> {
    return await this.entityRepository.findByIdentifier(query.identifier);
  }
}
