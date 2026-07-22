import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class CreateRelationshipCommand implements ICommand {
    readonly sourceEntityId: string;
    readonly sourceEntityTypeId: string;
    readonly targetEntityId: string;
    readonly targetEntityTypeId: string;
    readonly relationshipTypeId: string;
    readonly userId: string;
    constructor(sourceEntityId: string, sourceEntityTypeId: string, targetEntityId: string, targetEntityTypeId: string, relationshipTypeId: string, userId: string);
}
export declare class UpdateRelationshipCommand implements ICommand {
    readonly id: string;
    readonly relationshipTypeId: string;
    constructor(id: string, relationshipTypeId: string);
}
export declare class DeleteRelationshipCommand implements ICommand {
    readonly id: string;
    constructor(id: string);
}
export declare class PublishRelationshipCommand implements ICommand {
    readonly id: string;
    constructor(id: string);
}
export declare class ArchiveRelationshipCommand implements ICommand {
    readonly id: string;
    constructor(id: string);
}
export declare class RestoreRelationshipCommand implements ICommand {
    readonly id: string;
    constructor(id: string);
}
export declare class MergeRelationshipsCommand implements ICommand {
    readonly sourceRelationshipId: string;
    readonly targetRelationshipId: string;
    constructor(sourceRelationshipId: string, targetRelationshipId: string);
}
export declare class CreateRelationshipVersionCommand implements ICommand {
    readonly relationshipId: string;
    readonly data: Record<string, any>;
    constructor(relationshipId: string, data: Record<string, any>);
}
