import { ICommand } from '@shared/application/commands/ICommand';

export class CreateRelationshipCommand implements ICommand {
  constructor(
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly relationshipTypeId: string,
    public readonly userId: string
  ) {}
}

export class UpdateRelationshipCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly relationshipTypeId: string
  ) {}
}

export class DeleteRelationshipCommand implements ICommand {
  constructor(public readonly id: string) {}
}

export class PublishRelationshipCommand implements ICommand {
  constructor(public readonly id: string) {}
}

export class ArchiveRelationshipCommand implements ICommand {
  constructor(public readonly id: string) {}
}

export class RestoreRelationshipCommand implements ICommand {
  constructor(public readonly id: string) {}
}

export class MergeRelationshipsCommand implements ICommand {
  constructor(
    public readonly sourceRelationshipId: string,
    public readonly targetRelationshipId: string
  ) {}
}

export class CreateRelationshipVersionCommand implements ICommand {
  constructor(
    public readonly relationshipId: string,
    public readonly data: Record<string, any>
  ) {}
}
