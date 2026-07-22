import { CreateGraphNodeCommand } from '../commands/CreateGraphNodeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
import { OntologyValidator } from '../../domain/services/OntologyValidator';
import { logger as Logger } from '../../../../shared/logger/Logger';
export declare class CreateGraphNodeHandler {
    private readonly repository;
    private readonly ontologyValidator;
    private readonly eventBus;
    private readonly logger;
    constructor(repository: IGraphRepository, ontologyValidator: OntologyValidator, eventBus: EventBus, logger: typeof Logger);
    handle(command: CreateGraphNodeCommand, userId: string, ipAddress: string): Promise<void>;
}
