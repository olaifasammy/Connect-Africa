import { ICommand } from '../../../../shared/application/commands/ICommand';
export interface UpdateOntologyCommand extends ICommand {
    id: string;
    name: string;
    description: string;
}
