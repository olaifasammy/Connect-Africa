import { CreateGraphEdgeCommand } from '../commands/CreateGraphEdgeCommand';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { OntologyValidator } from '../../domain/services/OntologyValidator';
export declare class CreateGraphEdgeHandler {
    private readonly repository;
    private readonly ontologyValidator;
    constructor(repository: IGraphRepository, ontologyValidator: OntologyValidator);
    handle(command: CreateGraphEdgeCommand, userId: string, ipAddress: string): Promise<void>;
}
