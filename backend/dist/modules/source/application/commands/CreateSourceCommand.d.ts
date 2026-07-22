import { SourceType, Provenance } from '../../domain/value-objects/SourceValueObjects';
export declare class CreateSourceCommand {
    readonly userId: string;
    readonly title: string;
    readonly type: SourceType;
    readonly provenance: Provenance;
    constructor(userId: string, title: string, type: SourceType, provenance: Provenance);
}
