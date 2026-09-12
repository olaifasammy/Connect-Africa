import { ICommand } from '@shared/application/commands/ICommand';

function normalizeRequired(
  value: string,
  fieldName: string,
): string {
  if (
    typeof value !== 'string' ||
    value.trim().length === 0
  ) {
    throw new Error(
      `${fieldName} is required.`,
    );
  }

  return value.trim();
}

export class CreateRelationshipCommand
  implements ICommand
{
  constructor(
    public readonly sourceEntityId: string,
    public readonly targetEntityId: string,
    public readonly relationshipTypeId: string,
    public readonly userId: string,
  ) {
    this.sourceEntityId =
      normalizeRequired(
        sourceEntityId,
        'Source entity ID',
      );

    this.targetEntityId =
      normalizeRequired(
        targetEntityId,
        'Target entity ID',
      );

    this.relationshipTypeId =
      normalizeRequired(
        relationshipTypeId,
        'Relationship type ID',
      );

    this.userId =
      normalizeRequired(
        userId,
        'Authenticated user ID',
      );
  }
}

export class UpdateRelationshipCommand
  implements ICommand
{
  constructor(
    public readonly id: string,
    public readonly relationshipTypeId: string,
  ) {
    this.id = normalizeRequired(
      id,
      'Relationship ID',
    );

    this.relationshipTypeId =
      normalizeRequired(
        relationshipTypeId,
        'Relationship type ID',
      );
  }
}

export class DeleteRelationshipCommand
  implements ICommand
{
  constructor(
    public readonly id: string,
  ) {
    this.id = normalizeRequired(
      id,
      'Relationship ID',
    );
  }
}