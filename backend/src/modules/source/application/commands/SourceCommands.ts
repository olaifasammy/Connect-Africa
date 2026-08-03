import { SourceId } from '../../domain/value-objects/SourceValueObjects';

export class UpdateSourceCommand {
  constructor(
    public readonly sourceId: SourceId,
    public readonly title?: string,
    public readonly provenance?: any // Simplified
  ) {}
}

export class DeleteSourceCommand {
  constructor(public readonly sourceId: SourceId) {}
}
