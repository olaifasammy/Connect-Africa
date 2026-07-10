import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { PublishOntologyCommand } from '../commands/PublishOntologyCommand';
import { OntologyService } from '../services/OntologyService';
export declare class PublishOntologyCommandHandler implements ICommandHandler<PublishOntologyCommand, void> {
    private readonly ontologyService;
    constructor(ontologyService: OntologyService);
    handle(command: PublishOntologyCommand, userId?: string, ipAddress?: string): Promise<void>;
}
