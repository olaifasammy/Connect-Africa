import { SourceType, Provenance } from '../../domain/value-objects/SourceValueObjects';
export declare class CreateSourceCommand {
    readonly title: string;
    readonly type: SourceType;
    readonly provenance: Provenance;
    constructor(title: string, type: SourceType, provenance: Provenance);
}
