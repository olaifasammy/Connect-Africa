import { ICommand } from '../../../../shared/application/commands/ICommand';
export interface CreateOntologyCommand extends ICommand {
    name: string;
    description: string;
    version: number;
}
