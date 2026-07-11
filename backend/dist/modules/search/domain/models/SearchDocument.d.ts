import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class SearchDocument {
    readonly id: UniqueEntityId;
    readonly resourceType: string;
    readonly resourceId: UniqueEntityId;
    readonly content: Record<string, any>;
    readonly createdAt: Date;
    constructor(id: UniqueEntityId, resourceType: string, resourceId: UniqueEntityId, content: Record<string, any>, createdAt?: Date);
}
