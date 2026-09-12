import { SourceId, SourceType, Provenance } from '../../domain/value-objects/SourceValueObjects';

export class UpdateSourceCommand {
  constructor(
    public readonly sourceId: SourceId,
    public readonly title?: string,
    public readonly author?: string,
    public readonly publishedAt?: Date,
    public readonly url?: string,
    public readonly publisher?: string,
    public readonly provenance?: Provenance
  ) {}
}

export class DeleteSourceCommand {
  constructor(public readonly sourceId: SourceId) {}
}
