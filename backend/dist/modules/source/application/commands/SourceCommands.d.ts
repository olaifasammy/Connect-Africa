import { SourceId } from '../../domain/value-objects/SourceValueObjects';
export declare class UpdateSourceCommand {
    readonly sourceId: SourceId;
    readonly title?: string | undefined;
    readonly provenance?: any | undefined;
    constructor(sourceId: SourceId, title?: string | undefined, provenance?: any | undefined);
}
export declare class DeleteSourceCommand {
    readonly sourceId: SourceId;
    constructor(sourceId: SourceId);
}
