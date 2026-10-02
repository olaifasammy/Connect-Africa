import { ICommand } from '@shared/application/commands/ICommand';

export class ResolveEntityDuplicateCommand implements ICommand {
  constructor(
    public readonly sourceEntityId: string,
    public readonly duplicateEntityId: string,
    public readonly action: 'MERGE' | 'DISMISS',
  ) {}
}
