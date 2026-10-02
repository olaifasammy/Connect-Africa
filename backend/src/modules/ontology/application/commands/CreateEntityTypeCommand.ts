import { ICommand } from '@shared/application/commands/ICommand';

export interface CreateEntityTypeCommand extends ICommand {
  ontologyId: string;
  name: string;
  description: string;
  displayName?: string;
  pluralDisplayName?: string;
  icon?: string;
  color?: string;
  namespaceUri?: string;
  parentEntityId?: string;
  isDraft?: boolean;
}
