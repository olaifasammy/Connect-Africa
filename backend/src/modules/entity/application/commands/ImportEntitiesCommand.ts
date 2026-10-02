import { ICommand } from '@shared/application/commands/ICommand';

export interface ImportEntityItem {
  name: string;
  type: string;
  description?: string;
  source?: string;
  tags?: string[];
  attributes?: Record<string, any>;
}

export class ImportEntitiesCommand implements ICommand {
  constructor(public readonly items: ImportEntityItem[]) {}
}
