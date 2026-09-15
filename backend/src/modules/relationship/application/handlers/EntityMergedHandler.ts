import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { EntityMergedEvent } from '@modules/entity/domain/events/EntityMergedEvent';
import { logger } from '@shared/logger/Logger';

@provide(EntityMergedHandler, true)
@injectable()
export class EntityMergedHandler {
  constructor(
    @inject('IRelationshipRepository')
    private readonly relationshipRepository: IRelationshipRepository,
  ) {}

  async handle(event: EntityMergedEvent): Promise<void> {
    const sourceId = event.sourceEntityId.value;
    const targetId = event.targetEntityId.value;

    logger.info(`Retargeting relationships from merged source entity ${sourceId} to target entity ${targetId}`);

    await this.relationshipRepository.retargetEntity(sourceId, targetId);
  }
}
