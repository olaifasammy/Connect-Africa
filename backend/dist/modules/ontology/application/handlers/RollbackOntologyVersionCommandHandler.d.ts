import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RollbackOntologyVersionCommand } from '../commands/RollbackOntologyVersionCommand';
import { OntologyVersionService } from '../services/OntologyVersionService';
export declare class RollbackOntologyVersionCommandHandler implements ICommandHandler<RollbackOntologyVersionCommand, void> {
    private readonly ontologyVersionService;
    constructor(ontologyVersionService: OntologyVersionService);
    handle(command: RollbackOntologyVersionCommand): Promise<void>;
}
