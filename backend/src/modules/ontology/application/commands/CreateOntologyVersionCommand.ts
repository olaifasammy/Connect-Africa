import { ICommand } from '@shared/application/commands/ICommand';

export interface CreateOntologyVersionCommand extends ICommand {
  ontologyId: string;
  version: number;
}
