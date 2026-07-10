import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ArchiveOntologyCommand } from '../commands/ArchiveOntologyCommand';
import { OntologyService } from '../services/OntologyService';
export declare class ArchiveOntologyCommandHandler implements ICommandHandler<ArchiveOntologyCommand, void> {
    private readonly ontologyService;
    constructor(ontologyService: OntologyService);
    handle(command: ArchiveOntologyCommand, userId?: string, ipAddress?: string): Promise<void>;
}
