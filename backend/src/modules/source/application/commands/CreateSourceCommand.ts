import { SourceType, Provenance } from '../../domain/value-objects/SourceValueObjects';

export class CreateSourceCommand {
  constructor(
    public readonly title: string,
    public readonly type: SourceType,
    public readonly provenance: Provenance
  ) {}
}
