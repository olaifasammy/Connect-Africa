import { ICommand } from '@shared/application/commands/ICommand';

export interface PublishOntologyVersionCommand extends ICommand {
  id: string;
}
