import { CreateGraphEdgeCommand } from '../commands/CreateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
import { OntologyValidator } from '../../domain/services/OntologyValidator';
export declare class CreateGraphEdgeHandler {
    private readonly repository;
    private readonly ontologyValidator;
    private readonly eventBus;
    constructor(repository: IGraphRepository, ontologyValidator: OntologyValidator, eventBus: EventBus);
    handle(command: CreateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void>;
}
