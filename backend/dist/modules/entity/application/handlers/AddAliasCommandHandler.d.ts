import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { AddAliasCommand } from '../../../entity/application/commands/AddAliasCommand';
import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { IEntityAliasRepository } from '../../../entity/domain/repositories/IEntityAliasRepository';
import { IAuditRepository } from '../../../audit/public';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class AddAliasCommandHandler implements ICommandHandler<AddAliasCommand, void> {
    private readonly entityRepository;
    private readonly entityAliasRepository;
    private readonly auditRepository;
    private readonly eventBus;
    constructor(entityRepository: IEntityRepository, entityAliasRepository: IEntityAliasRepository, auditRepository: IAuditRepository, eventBus: EventBus);
    handle(command: AddAliasCommand): Promise<void>;
}
