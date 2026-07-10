import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { DeleteEntityCommand } from '../../../entity/application/commands/DeleteEntityCommand';
import { EntityId } from '../../../entity/domain/value-objects/EntityId';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '../../../audit/domain/repositories/IAuditRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class DeleteEntityCommandHandler implements ICommandHandler<DeleteEntityCommand, void> {
    private readonly entityRepository;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository & {
        delete(id: EntityId): Promise<void>;
    }, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: DeleteEntityCommand): Promise<void>;
}
