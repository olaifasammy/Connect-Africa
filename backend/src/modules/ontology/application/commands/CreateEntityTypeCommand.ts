import { ICommand } from '@shared/application/commands/ICommand';

export interface CreateEntityTypeCommand extends ICommand {
  ontologyId: string;
  name: string;
  description: string;
}
